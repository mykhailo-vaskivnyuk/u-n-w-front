import { getRoutesMap } from './utils';

export const RelativeRoutesMap = {
  INDEX: '',
  ABOUT: 'about',
  ACCOUNT: {
    INDEX: 'account',
    SIGNUP: 'signup',
    LOGIN: 'login',
    OVERMAIL: 'overmail',
    LOGOUT: 'logout',
    CONFIRM: 'confirm/*',
    RESTORE: 'restore/*',
  },
  NET: {
    INDEX: 'net',
    CREATE: 'create',
    ENTER: 'enter/*',
    COMEOUT: 'comeout',
    LEAVE: 'leave',
  },
  PALETTE: 'palette',
  MAIL: 'mail',
};

export const RoutesMap = getRoutesMap(RelativeRoutesMap) as typeof RelativeRoutesMap;
