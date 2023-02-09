/* eslint-disable max-lines */
/* eslint-disable import/no-cycle */
import * as T from '../server/types/types';
import { IMember } from './types';
import { AppStatus } from './constants';
import { HttpResponseError } from './connection/errors';
import { EventEmitter } from './event.emitter';
import { getApi, IClientApi } from '../server/client.api';
import { Account } from './classes/account.class';
import { UserNets } from './classes/user.nets.class';
import { Net } from './classes/net.class';
import { Chat } from './classes/chat.class';
import { Changes } from './classes/changes.class';
import { getMemberMethods } from './methods/member';
import { getConnection as getHttpConnection } from './connection/http';
import { getConnection as getWsConnection } from './connection/ws';

export class ClientApp extends EventEmitter {
  private baseUrl = '';
  private api: IClientApi | null;
  private status: AppStatus = AppStatus.INITING;
  private error: HttpResponseError | null = null;
  private user: T.IUserResponse = null;
  private memberData?: IMember;

  account: Account;
  net: Net;
  userNets: UserNets;
  chat: Chat;
  changes: Changes;
  member: ReturnType<typeof getMemberMethods>;

  constructor() {
    super();
    this.baseUrl = process.env.API || `${window.location.origin}/api`;
    this.account = new Account(this as any);
    this.net = new Net(this as any);
    this.chat = new Chat(this as any);
    this.changes = new Changes(this as any);
    this.member = getMemberMethods(this as any);
    this.setInitialValues();
  }

  getState() {
    return {
      status: this.status,
      error: this.error,
      user: this.user,
      memberData: this.memberData,
      ...this.userNets.getUserNetsState(),
      ...this.net.getNetState(),
      ...this.chat.getChatState(),
      ...this.changes.getChangesState(),
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
          this.chat.setMessage,
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
    this.chat.reset();
    this.changes = new Changes(this as any);
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
    this.chat.reset();
    this.chat.connectAll().catch((e) => this.setError(e));
    this.changes.read(true).catch((e) => this.setError(e));
  }
}

export const app = new ClientApp();
