/* eslint-disable import/no-cycle */
import { AppState } from '../constants';
import { ClientAppThis } from './client.app';

export const getAccountMethods = (parent: ClientAppThis) => ({
  async loginOrSignup(
    type: 'login' | 'signup',
    args: Parameters<typeof parent.clientApi.account[typeof type]>[0],
  ) {
    parent.setState(AppState.LOADING);
    try {
      const user = await parent.clientApi.account[type](args as any);
      user && parent.setUser(user);
      parent.setState(AppState.READY);
      return Boolean(user);
    } catch (e) {
      parent.setState(AppState.ERROR);
      throw e;
    }
  },

  async logoutOrRemove(type: 'logout' | 'remove') {
    parent.setState(AppState.LOADING);
    try {
      const success = await parent.clientApi.account[type]();
      success && parent.setUser(null);
      parent.setState(AppState.READY);
      return success;
    } catch (e) {
      parent.setState(AppState.ERROR);
      throw e;
    }
  },

  async overmail(...args: Parameters<typeof parent.clientApi.account.overmail>) {
    parent.setState(AppState.LOADING);
    try {
      const success = await parent.clientApi.account.overmail(...args);
      parent.setState(AppState.READY);
      return success;
    } catch (e) {
      parent.setState(AppState.ERROR);
      throw e;
    }
  },

  async loginOverLink(
    type: 'confirm' | 'restore',
    ...args: Parameters<typeof parent.clientApi.account.confirm>
  ) {
    parent.setState(AppState.LOADING);
    try {
      const user = await parent.clientApi.account[type](...args);
      user && parent.setUser(user);
      parent.setState(AppState.READY);
      return Boolean(user);
    } catch (e) {
      parent.setState(AppState.ERROR);
      throw e;
    }
  },
});
