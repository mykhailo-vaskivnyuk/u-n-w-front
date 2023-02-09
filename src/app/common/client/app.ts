/* eslint-disable max-lines */
/* eslint-disable import/no-cycle */
import * as T from '../server/types/types';
import { ITableUsersBoardMessages } from '../../local/imports';
import { IMember, TNetChatIdsMap } from './types';
import { AppStatus } from './constants';
import { HttpResponseError } from './connection/errors';
import { EventEmitter } from './event.emitter';
import { getApi, IClientApi } from '../server/client.api';
import { Account } from './methods/account.class';
import { UserNets } from './methods/user.nets.class';
import { Net } from './methods/net.class';
import { getMemberMethods } from './methods/member';
import { getChatMethods } from './methods/chat';
import { getChangesMethods } from './methods/changes';
import { getConnection as getHttpConnection } from './connection/http';
import { getConnection as getWsConnection } from './connection/ws';

export class ClientApp extends EventEmitter {
  private baseUrl = '';
  private api: IClientApi | null;

  private status: AppStatus = AppStatus.INITING;
  private error: HttpResponseError | null = null;

  private user: T.IUserResponse = null;
  private messages: Map<number, T.IChatMessage[]>;
  private memberData?: IMember;
  private userChatId?: number;
  private netChatIds: TNetChatIdsMap;
  private netChanges: T.IUserChanges;
  private boardMessages: ITableUsersBoardMessages[];

  account: Account;
  net: Net;
  userNets: UserNets;
  member: ReturnType<typeof getMemberMethods>;
  chat: ReturnType<typeof getChatMethods>;
  changes: ReturnType<typeof getChangesMethods>;

  constructor() {
    super();
    this.setInitialValues();
    this.baseUrl = process.env.API || `${window.location.origin}/api`;
    this.account = new Account(this as any);
    this.net = new Net(this as any);
    this.member = getMemberMethods(this as any);
    this.chat = getChatMethods(this as any);
    this.changes = getChangesMethods(this as any);
  }

  getState() {
    return {
      status: this.status,
      error: this.error,
      user: this.user,
      ...this.userNets.getUserNetsState(),
      ...this.net.getNetState(),
      memberData: this.memberData,
      messages: this.messages,
      chatIds: this.netChatIds,
      changes: this.netChanges,
      boardMessages: this.boardMessages,
    };
  }

  async init() {
    try {
      const connection = getHttpConnection(this.baseUrl);
      this.api = getApi(connection);
      await this.api.health();
    } catch (e: any) {
      if (!(e instanceof HttpResponseError)) return this.setError(e);
      if (e.statusCode !== 503) return this.setError(e);
      try {
        const baseUrl = this.baseUrl.replace('http', 'ws');
        const connection = getWsConnection(
          baseUrl,
          this.handleConnect.bind(this),
          this.setMessage.bind(this),
        );
        this.api = getApi(connection);
        await this.api.health();
      } catch (err: any) {
        return this.setError(err);
      }
    }
    await this.readUser();
    this.setStatus(AppStatus.INITED);
  }

  private setInitialValues() {
    this.userNets = new UserNets(this as any);
    this.messages = new Map();
    this.netChatIds = new Map();
    this.netChanges = [];
  }

  private setStatus(status: AppStatus) {
    if (status === AppStatus.ERROR) {
      this.status = status;
      this.emit('error', this.error);
      return this.emit('statuschanged', this.status);
    }
    this.error = null;
    if (status === AppStatus.INITED) {
      this.status = AppStatus.READY;
      return this.emit('statuschanged', this.status);
    }
    if (this.status === AppStatus.INITING) return;
    this.status = status;
    return this.emit('statuschanged', this.status);
  }

  private setError(e: HttpResponseError) {
    this.error = e;
    this.setStatus(AppStatus.ERROR);
  }

  private async readUser() {
    this.setStatus(AppStatus.LOADING);
    try {
      const user = await this.api!.user.read();
      await this.setUser(user);
      this.setStatus(AppStatus.READY);
      return user;
    } catch (e: any) {
      this.setError(e);
    }
  }

  private async setUser(user: T.IUserResponse, readChanges = true) {
    if (this.user === user) return;
    this.user = user;
    if (user && user.user_status !== 'NOT_CONFIRMED') {
      await this.userNets.getAllNets();
      this.userNets.getNets();
      readChanges && await this.changes.read(true);
    } else this.setInitialValues();
    this.emit('user', user);
  }

  private setUserStatus(status: T.UserStatusKeys) {
    if (!this.user) return;
    this.user!.user_status = status;
    this.emit('user', { ...this.user });
  }

  private setMember(memberData?: IMember) {
    this.memberData = memberData;
  }

  private handleConnect() {
    if (this.status === AppStatus.INITING) return;
    this.userChatId = undefined;
    this.netChatIds = new Map();
    this.messages = new Map();
    this.chat.connectAll().catch((e) => this.setError(e));
    this.changes.read(true).catch((e) => this.setError(e));
  }

  private setUserChatId(message: T.IChatConnectResponse) {
    if (!message) return;
    this.userChatId = message.chatId;
  }

  private setNetChatIds(netChatIds: TNetChatIdsMap) {
    this.netChatIds = netChatIds;
  }

  private setMessage(messageData: T.IChatResponseMessage | T.IInstantChange) {
    if (!messageData) return;

    if (this.changes.isInstantChange(messageData)) {
      this.changes.update([messageData]);
      return;
    }

    const { chatId } = messageData;
    if (chatId === this.userChatId) {
      this.changes.read();
      return;
    }

    if (!messageData.message) return;
    const chatMessages = this.messages.get(chatId);
    if (chatMessages) {
      const lastMessage = chatMessages.at(-1);
      const { index = 1 } = lastMessage || {};
      if (messageData.index > index + 1)
        this.chat.getMessages(chatId, index + 1);
      chatMessages.push(messageData as T.IChatMessage);
    } else this.messages.set(chatId, [messageData as T.IChatMessage]);
    this.emit('message', chatId);
  }

  private setAllMessages(chatId: number, messages: T.IChatMessage[]) {
    if (!messages.length) return;
    const curChatMessages = this.messages.get(chatId);
    let chatMessages: T.IChatMessage[];
    if (curChatMessages) {
      chatMessages = [...curChatMessages, ...messages]
        .sort(({ index: a }, { index: b }) => a - b)
        .filter(({ index }, i, arr) => index !== arr[i + 1]?.index);
    } else chatMessages = [...messages];
    this.messages.set(chatId, chatMessages);
    this.emit('message', chatId);
  }

  private setBoardMessages(messages: ITableUsersBoardMessages[] = []) {
    this.boardMessages = messages;
  }

  private setChanges(changes: T.IUserChanges) {
    this.netChanges = changes;
    this.emit('changes', changes);
  }
}

export const app = new ClientApp();
