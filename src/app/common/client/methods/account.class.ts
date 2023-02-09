/* eslint-disable import/no-cycle */
import * as T from '../../server/types/types';
import { AppStatus } from '../constants';
import { IClientAppThis, TLoginOrSignup } from '../types';

type IApp = Pick<IClientAppThis,
  | 'api'
  | 'setStatus'
  | 'setError'
  | 'setUser'
>;

export class Account{

  constructor(private app: IApp) {}

  async loginOrSignup(...[type, args]: TLoginOrSignup) {
    this.app.setStatus(AppStatus.LOADING);
    try {
      const user = await this.app.api.account[type](args as any);
      user && await this.app.setUser(user);
      this.app.setStatus(AppStatus.READY);
      return user;
    } catch (e: any) {
      this.app.setError(e);
      throw e;
    }
  }

  async logoutOrRemove(type: 'logout' | 'remove') {
    this.app.setStatus(AppStatus.LOADING);
    try {
      const success = await this.app.api.account[type]();
      success && await this.app.setUser(null);
      this.app.setStatus(AppStatus.READY);
      return success;
    } catch (e: any) {
      this.app.setError(e);
      throw e;
    }
  }

  async overmail(args: T.ISignupParams) {
    this.app.setStatus(AppStatus.LOADING);
    try {
      const success = await this.app.api.account.overmail(args);
      this.app.setStatus(AppStatus.READY);
      return success;
    } catch (e: any) {
      this.app.setError(e);
    }
  }

  async loginOverLink(
    type: 'confirm' | 'restore', args: T.ITokenParams,
  ): Promise<T.IUserResponse> {
    this.app.setStatus(AppStatus.LOADING);
    try {
      const user = await this.app.api.account[type](args);
      user && await this.app.setUser(user);
      this.app.setStatus(AppStatus.READY);
      return user;
    } catch (e: any) {
      this.app.setError(e);
      throw e;
    }
  }
}
