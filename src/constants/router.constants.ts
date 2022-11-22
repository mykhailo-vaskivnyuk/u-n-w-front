import { getRoutesMap } from '../components/router/utils';

export const RelativeRoutesMap = {
  ROOT: '',
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
    // CREATE: 'create',
    COMEOUT: 'comeout',
    LEAVE: 'leave',
  },
  USER: {
    INDEX: 'user',
    NET: {
      INDEX: 'net',
      CREATE: 'create',
      NET_NUMBER: {
        INDEX: '*',
        CREATE: 'create',
      },
    },
  },
  PALETTE: 'palette',
  MAIL: 'mail',
};

export const RoutesMap = getRoutesMap(RelativeRoutesMap) as typeof RelativeRoutesMap;
