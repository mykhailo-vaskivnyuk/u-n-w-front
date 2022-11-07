/* eslint-disable import/no-cycle */
import { HttpResponseError } from '../errors';
import { AppState } from '../constants';
import { IUserResponse } from '../api/types';
import EventEmitter from '../event.emitter';
import { getApi, IClientApi } from '../api/client.api';
import { getConnection } from '../client.ws';
import { getAccountMethods } from './account';

export type ClientAppThis = ClientApp & {
  state: AppState;
  clientApi: ReturnType<typeof getApi>;
  setState: (state: AppState) => void;
  setUser: (user: IUserResponse) => void;
  setError: (e: HttpResponseError) => void;
};

export class ClientApp extends EventEmitter {
  protected clientApi: IClientApi | null;

  private baseUrl = process.env.API || '';

  protected state: AppState = AppState.INIT;

  private user: IUserResponse = null;

  private error: HttpResponseError | null = null;

  account: ReturnType<typeof getAccountMethods>;

  constructor() {
    super();
    this.account = getAccountMethods(this as unknown as ClientAppThis);
    if (!this.baseUrl) {
      const { protocol, host } = window.location;
      this.baseUrl = `${protocol}//${host}/api`;
    }
    this.init();
  }

  private async init() {
    const connection = await getConnection(this.baseUrl);
    this.clientApi = getApi(connection);
    await this.readUser();
    this.state = AppState.READY;
    this.emit('statechanged', this.state);
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
    if (this.state === AppState.INIT) return;
    this.state = state;
    this.error = null;
    if (state !== AppState.READY) {
      return this.emit('statechanged', this.state);
    }
    Promise.resolve()
      .then(() => this.emit('statechanged', this.state))
      .catch((e) => console.log(e));
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
