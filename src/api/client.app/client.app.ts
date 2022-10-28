/* eslint-disable import/no-cycle */
import { AppState } from '../constants';
import { IUser } from '../types';
import EventEmmiter from '../event.emmiter';
import { api } from '../client.api';
import { getConnection } from '../client.fetch';
import { getAccountMethods } from './account';

export type ClientAppThis = ClientApp & {
  state: AppState;
  clientApi: ReturnType<typeof api>;
  setState: (state: AppState) => void;
  setUser: (user: IUser | null) => void;
};

export class ClientApp extends EventEmmiter {
  protected clientApi;

  protected state: AppState = AppState.INIT;

  private user: IUser | null = null;

  account: ReturnType<typeof getAccountMethods>;

  constructor(baseUrl: string) {
    super();
    const connection = getConnection(baseUrl);
    this.clientApi = api(connection);
    this.account = getAccountMethods(this as unknown as ClientAppThis);
  }

  async init() {
    await this.readUser();
    this.state = AppState.READY;
    this.emit('statechanged', this.state);
  }

  getState() {
    return {
      state: this.state,
      user: this.user,
    };
  }

  protected setUser(user: IUser | null) {
    this.user = user;
    this.emit('user', this.user);
  }

  protected setState(state: AppState) {
    if (this.state === AppState.INIT) return;
    this.state = state;
    this.emit('statechanged', this.state);
  }

  private async readUser(...args: Parameters<typeof this.clientApi.user.read>) {
    this.setState(AppState.LOADING);
    let user = null;
    try {
      user = await this.clientApi.user.read(...args);
      this.setUser(user);
      this.setState(AppState.READY);
      return Boolean(user);
    } catch (e) {
      this.setState(AppState.ERROR);
    }
  }

  override on(...args: Parameters<EventEmmiter['on']>) {
    super.on(...args);
    const eventsMap = {
      user: this.user,
    };
    const [event, cb] = args;
    event in eventsMap && cb(eventsMap[event as keyof typeof eventsMap]);
  }
}

let baseUrl = process.env.API;

if (!baseUrl) {
  const { protocol, host } = window.location;
  baseUrl = `${protocol}//${host}/api`;
}

export const app = new ClientApp(baseUrl);
