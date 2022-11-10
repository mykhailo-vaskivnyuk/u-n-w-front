/* eslint-disable import/no-cycle */
import { HttpResponseError } from '../errors';
import { AppState } from '../constants';
import { IUserResponse } from '../api/types';
import EventEmitter from '../event.emitter';
import { getApi, IClientApi } from '../api/client.api';
import { getAccountMethods } from './account';
import { getConnection as getHttpConnection } from '../client.http';
import { getConnection as getWsConnection } from '../client.ws';

export class ClientApp extends EventEmitter {
  protected clientApi: IClientApi | null;

  private baseUrl = '';

  protected state: AppState = AppState.INITING;

  private user: IUserResponse = null;

  private error: HttpResponseError | null = null;

  account: ReturnType<typeof getAccountMethods>;

  constructor() {
    super();
    this.account = getAccountMethods(this as any);
    this.baseUrl = process.env.API || `${window.location.origin}/api`;
  }

  async init() {
    try {
      const connection = await getHttpConnection(this.baseUrl);
      this.clientApi = getApi(connection);
      await this.clientApi.health();
    } catch (e) {
      if (!(e instanceof HttpResponseError)) return this.setState(AppState.ERROR);
      if (e.statusCode !== 503) return this.setState(AppState.ERROR);
      try {
        const baseUrl = this.baseUrl.replace('http', 'ws');
        const connection = await getWsConnection(baseUrl);
        this.clientApi = getApi(connection);
        await this.clientApi.health();
      } catch (err) {
        return this.setState(AppState.ERROR);
      }
    }
    await this.readUser();
    this.setState(AppState.INITED);
  }

  getState() {
    return {
      state: this.state,
      user: this.user,
      error: this.error,
    };
  }

  protected setUser(user: IUserResponse) {
    this.user = user;
    this.emit('user', user);
  }

  protected setState(state: AppState) {
    if (state === AppState.ERROR) {
      this.state = state;
      return this.emit('statechanged', this.state);
    }
    this.error = null;
    if (state === AppState.INITED) {
      this.state = state;
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
      this.setUser(user);
      this.setState(AppState.READY);
      return user;
    } catch (e) {
      this.setState(AppState.ERROR);
    }
  }
}

export const app = new ClientApp();
