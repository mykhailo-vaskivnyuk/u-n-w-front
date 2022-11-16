export enum AppState {
  INITING = 'initing',
  INITED = 'inited',
  LOADING = 'loading',
  READY = 'ready',
  ERROR = 'error',
}

export const USER_STATE_MAP = {
  NOT_LOGGEDIN: 'notLogedIn',
  NOT_CONFIRMED: 'notConfirmed',
  LOGGEDIN: 'logedIn',
  INSIDE_NET: 'insideNet',
  DEV: 'dev',
};
export type UserStateKeys = keyof typeof USER_STATE_MAP;
