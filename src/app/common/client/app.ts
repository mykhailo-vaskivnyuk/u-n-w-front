/* eslint-disable max-lines */
/* eslint-disable import/no-cycle */
import * as T from '../server/types/types';
import { AppStatus } from './constants';
import { HttpResponseError } from './connection/errors';
import { EventEmitter } from './event.emitter';
import { getApi, IClientApi } from '../server/client.api';
import { Account } from './classes/account.class';
import { UserNets } from './classes/user.nets.class';
import { Net } from './classes/net.class';
import { Chat } from './classes/chat.class';
import { Events } from './classes/events.class';
import { getConnection as getHttpConnection } from './connection/http';
import { getConnection as getWsConnection } from './connection/ws';
import { IEvents } from '../server/types/types';

export class ClientApp extends EventEmitter {
  private baseUrl = '';
  private api: IClientApi | null;
  private status: AppStatus = AppStatus.INITING;
  private error: HttpResponseError | null = null;

  account: Account;
  net: Net;
  userNets: UserNets;
  chat: Chat;
  userEvents: Events;

  constructor() {
    super();
    this.baseUrl = process.env.API || `${window.location.origin}/api`;
    this.account = new Account(this as any);
    this.net = new Net(this as any);
    this.chat = new Chat(this as any);
    this.userEvents = new Events(this as any);
    this.setInitialValues();
  }

  /**
   *  status: this.status,
   *  error: this.error,
   *  user: this.account.getUser(),
   *  ...this.userNets.getUserNetsState(),
   *  - allNets: this.allNets,
   *  - nets: this.nets,
   *  ...this.net.getNetState(),
   *  - userNetData: this.userNetData,
   *  - net: this.userNet,
   *  - circle: this.circle,
   *  - tree: this.tree,
   *  - netView: this.netView,
   *  - boardMessages: this.board.getState(),
   *  - memberData: this.memberData,
   *  ...this.chat.getChatState(),
   *  - messages: this.messages,
   *  - chatIds: this.netChatIds,
   *  events: this.events.getEvents(),
   */
  getState() {
    return {
      status: this.status,
      error: this.error,
      user: this.account.getUser(),
      ...this.userNets.getUserNetsState(),
      ...this.net.getNetState(),
      ...this.chat.getChatState(),
      events: this.userEvents.getEvents(),
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
      } catch (error: any) {
        return this.setError(error);
      }
    }
    await this.account.readUser();
    this.setStatus(AppStatus.INITED);
  }

  private setInitialValues() {
    this.userNets = new UserNets(this as any);
    this.chat = new Chat(this as any);
    this.userEvents = new Events(this as any);
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

  private handleConnect() {
    if (this.status === AppStatus.INITING) return;
    this.chat.connectAll().catch((e) => this.setError(e));
    this.userEvents.read(true).catch((e) => this.setError(e));
  }
  
  private async setUser(user: T.IUserResponse, readChanges = true) {
    if (user && user.user_status !== 'NOT_CONFIRMED') {
      await this.userNets.getAllNets();
      this.userNets.getNets();
      readChanges && await this.userEvents.read(true);
    } else this.setInitialValues();
  }

  private async setNet(methodName: keyof Net) {
    if (['comeout', 'leave', 'connectByInvite'].includes(methodName)) {
      return this.userNets.getAllNets();
    }
    this.userNets.getNets();
  }

  async setEvents(events: IEvents) {
    const { user, net } = this.getState();
    const { net_id } = net || {};
    let updateUser = false;
    let updateNet = false;
    for (const event of events) {
      const { net_id: eventNetId } = event;
      if (!eventNetId) {
        updateUser = true;
        net_id && (updateNet = true);
        break;
      }
      if (eventNetId === net_id) updateNet = true;
    }
    if (updateUser) await this.setUser({ ...user! }, false)
      .catch(console.log);
    if (updateNet) await this.net.enter(net_id!, true)
      .catch(console.log);
  }

  setMessage<T extends T.MessageTypeKeys>(
    messageData: T.IMessage<T>,
  ) {
    if (!messageData) return;

    if (this.userEvents.isNewEvents(messageData))
      return this.userEvents.read();
    if (this.userEvents.isEvent(messageData))
      return this.setEvents([messageData]);

    this.chat.setMessage(messageData);
  }
}

export const app = new ClientApp();
