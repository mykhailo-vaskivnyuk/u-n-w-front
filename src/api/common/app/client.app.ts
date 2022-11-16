/* eslint-disable max-lines */
/* eslint-disable import/no-cycle */
import { TNetReadUserNetsResponse } from '../api/types/client.api.types';
import { INetCreateResponse } from '../api/types/net.types';
import { IUserResponse } from '../api/types/types';
import { AppState } from '../constants';
import { HttpResponseError } from '../errors';
import EventEmitter from '../event.emitter';
import { getApi, IClientApi } from '../api/client.api';
import { getAccountMethods } from './account';
import { getConnection as getHttpConnection } from '../client.http';
import { getConnection as getWsConnection } from '../client.ws';
import { getNetMethods } from './net';

export class ClientApp extends EventEmitter {
  protected clientApi: IClientApi | null;
  private baseUrl = '';
  protected state: AppState = AppState.INITING;
  private user: IUserResponse = null;
  private net: INetCreateResponse | null = null;
  private nets: TNetReadUserNetsResponse[] = []; 
  private error: HttpResponseError | null = null;
  account: ReturnType<typeof getAccountMethods>;
  netMethods: ReturnType<typeof getNetMethods>;

  constructor() {
    super();
    this.account = getAccountMethods(this as any);
    this.netMethods = getNetMethods(this as any);
    this.baseUrl = process.env.API || `${window.location.origin}/api`;
  }

  async init() {
    try {
      const connection = await getHttpConnection(this.baseUrl);
      this.clientApi = getApi(connection);
      await this.clientApi.health();
    } catch (e: any) {
      if (!(e instanceof HttpResponseError)) return this.setError(e);
      if (e.statusCode !== 503) return this.setError(e);
      try {
        const baseUrl = this.baseUrl.replace('http', 'ws');
        const connection = await getWsConnection(baseUrl);
        this.clientApi = getApi(connection);
        await this.clientApi.health();
      } catch (err: any) {
        return this.setError(err);
      }
    }
    await this.readUser();
    this.setState(AppState.INITED);
  }

  getState() {
    return {
      state: this.state,
      user: this.user,
      net: this.net,
      nets: this.nets,
      error: this.error,
    };
  }

  protected async setUser(user: IUserResponse) {
    this.user = user;
    this.emit('user', user);
    if (user && user.user_state === 'LOGGEDIN') {
      await this.netMethods.getNets();
    } else {
      this.setNet(null);
      this.setNets([]);
    }
  }

  protected setNet(net: INetCreateResponse | null) {
    this.net = net;
    net && (this.user!.user_state = 'INSIDE_NET');
    this.emit('net', net);
  }

  protected setNets(nets: TNetReadUserNetsResponse[]) {
    this.nets = nets;
    this.emit('nets', nets);
  }

  protected setState(state: AppState) {
    if (state === AppState.ERROR) {
      this.state = state;
      this.emit('error', this.error);
      return this.emit('statechanged', this.state);
    }
    this.error = null;
    if (state === AppState.INITED) {
      this.state = AppState.READY;
      return this.emit('statechanged', this.state);
    }
    if (this.state === AppState.INITING) return;
    this.state = state;
    return this.emit('statechanged', this.state);
  }

  protected setError(e: HttpResponseError) {
    this.error = e;
    this.setState(AppState.ERROR);
  }

  private async readUser() {
    this.setState(AppState.LOADING);
    try {
      const user = await this.clientApi!.user.read();
      await this.setUser(user);
      this.setState(AppState.READY);
      return user;
    } catch (e: any) {
      this.setError(e);
    }
  }
}

export const app = new ClientApp();
