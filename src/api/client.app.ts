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
    await this.readUser({});
    this.setState(AppState.READY);
  }

  getUser() {
    return this.user;
  }

  private setUser(user: IUser | null) {
    this.user = user;
    this.emit('user', this.user);
  }

  private setState(state: AppState) {
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
      throw new Error();
    }
  }

  async login(...args: Parameters<typeof this.clientApi.auth.login>) {
    this.setState(AppState.LOADING);
    let user = null;
    try {
      user = await this.clientApi.auth.login(...args);
      this.setState(AppState.READY);
      if (!user) return false;
      this.setUser(user);
      return true;
    } catch (e) {
      this.setState(AppState.ERROR);
      return false;
    }
  }

  async logout(...args: Parameters<typeof this.clientApi.auth.logout>) {
    this.setState(AppState.LOADING);
    try {
      await this.clientApi.auth.logout(...args);
      this.setUser(null);
      this.setState(AppState.READY);
      return true;
    } catch (e) {
      this.setState(AppState.ERROR);
    }
  }

  async signup(...args: Parameters<typeof this.clientApi.auth.signup>) {
    this.setState(AppState.LOADING);
    try {
      const user = await this.clientApi.auth.signup(...args);
      if (!user) throw new Error('Wrong credentials');
      this.setUser(user);
      this.setState(AppState.READY);
      return true;
    } catch (e) {
      this.setState(AppState.ERROR);
      throw e;
    }
  }

  async overmail(...args: Parameters<typeof this.clientApi.auth.signup>) {
    this.setState(AppState.LOADING);
    let user = null;
    try {
      user = null; // await this.clientApi.auth.ovremail(...args);
    } catch (e) {
      this.state = AppState.ERROR;
    }
    this.user = user;
    this.setState(AppState.READY);
    return user;
  }

  async confirm(...args: Parameters<typeof this.clientApi.auth.confirm>) {
    this.setState(AppState.LOADING);
    let user = null;
    try {
      user = await this.clientApi.auth.confirm(...args);
    } catch (e) {
      this.state = AppState.ERROR;
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
