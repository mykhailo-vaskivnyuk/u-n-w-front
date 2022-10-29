/* eslint-disable import/no-cycle */
import { AppState } from '../constants';
import { ClientAppThis } from './client.app';

export const getAccountMethods = (parent: ClientAppThis) => ({
  async login(...args: Parameters<typeof parent.clientApi.account.login>) {
    parent.setState(AppState.LOADING);
    let user = null;
    try {
      user = await parent.clientApi.account.login(...args);
      parent.setState(AppState.READY);
      if (!user) return false;
      parent.setUser(user);
      return true;
    } catch (e) {
      parent.setState(AppState.ERROR);
      return false;
    }
  },

  async logout(...args: Parameters<typeof parent.clientApi.account.logout>) {
    parent.setState(AppState.LOADING);
    try {
      await parent.clientApi.account.logout(...args);
      parent.setUser(null);
      parent.setState(AppState.READY);
      return true;
    } catch (e) {
      parent.setState(AppState.ERROR);
    }
  },

  async signup(...args: Parameters<typeof parent.clientApi.account.signup>) {
    parent.setState(AppState.LOADING);
    try {
      const user = await parent.clientApi.account.signup(...args);
      user && parent.setUser(user);
      parent.setState(AppState.READY);
      return Boolean(user);
    } catch (e) {
      parent.setState(AppState.ERROR);
      throw e;
    }
  },

  async overmail(...args: Parameters<typeof parent.clientApi.account.signup>) {
    parent.setState(AppState.LOADING);
    try {
      const success = await parent.clientApi.account.overmail(...args);
      parent.setState(AppState.READY);
      if (!success) return false;
      return true;
    } catch (e) {
      parent.setState(AppState.ERROR);
    }
  },

  async confirm(...args: Parameters<typeof parent.clientApi.account.confirm>) {
    parent.setState(AppState.LOADING);
    try {
      const user = await parent.clientApi.account.confirm(...args);
      user && parent.setUser(user);
      parent.setState(AppState.READY);
      return Boolean(user);
    } catch (e) {
      parent.setState(AppState.ERROR);
      throw e;
    }
  },

  async restore(...args: Parameters<typeof parent.clientApi.account.restore>) {
    parent.setState(AppState.LOADING);
    try {
      const user = await parent.clientApi.account.restore(...args);
      user && parent.setUser(user);
      parent.setState(AppState.READY);
      return Boolean(user);
    } catch (e) {
      parent.setState(AppState.ERROR);
      throw e;
    }
  },

  async removeUser() {
    parent.setState(AppState.LOADING);
    try {
      const success = await parent.clientApi.account.remove();
      if (success) {
        parent.setUser(null);
        parent.setState(AppState.READY);
        return true;
      }

      parent.setState(AppState.READY);
      return false;
    } catch (e) {
      parent.setState(AppState.ERROR);
    }
  },
});
