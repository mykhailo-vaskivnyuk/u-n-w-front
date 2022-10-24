import { AppState } from './constants';
import EventEmmiter from './event.emmiter';
import { IUser } from './types';
import { api } from './client.api';
import { getConnection } from './client.fetch';

class ClientApp extends EventEmmiter {
  private clientApi;

  private state: AppState = AppState.INIT;

  private user: IUser | null = null;

  constructor(baseUrl: string) {
    super();
    const connection = getConnection(baseUrl);
    this.clientApi = api(connection);
  }

  async init() {
    this.setState(AppState.READY);
  }

  private setUser(user: IUser | null) {
    this.user = user;
    this.emit('user', this.user);
  }

  getUser() {
    return this.user;
  }

  private setState(state: AppState) {
    this.state = state;
    this.emit('statechanged', this.state);
  }

  async login(...args: Parameters<typeof this.clientApi.auth.login>) {
    this.setState(AppState.LOADING);
    let user = null;
    try {
      user = await this.clientApi.auth.login(...args);
    } catch (e) {
      console.log(e);
    }
    this.setUser(user);
    this.setState(AppState.READY);
    return Boolean(user);
  }

  async logout(...args: Parameters<typeof this.clientApi.auth.logout>) {
    this.setState(AppState.LOADING);
    let result = false;
    try {
      result = await this.clientApi.auth.logout(...args);
    } catch (e) {
      console.log(e);
    }
    this.user = null;
    this.setState(AppState.READY);
    return result;
  }

  async signup(...args: Parameters<typeof this.clientApi.auth.signup>) {
    this.setState(AppState.LOADING);
    let user = null;
    try {
      user = await this.clientApi.auth.signup(...args);
    } catch (e) {
      console.log(e);
    }
    this.user = user;
    this.setState(AppState.READY);
    return user;
  }

  async overmail(...args: Parameters<typeof this.clientApi.auth.signup>) {
    this.setState(AppState.LOADING);
    let user = null;
    try {
      user = await this.clientApi.auth.ovremail(...args);
    } catch (e) {
      console.log(e);
    }
    this.user = user;
    this.setState(AppState.READY);
    return user;
  }
}

let baseUrl = process.env.API;

if (!baseUrl) {
  const { protocol, host } = window.location;
  baseUrl = `${protocol}//${host}/api`;
}

export const app = new ClientApp(baseUrl);
