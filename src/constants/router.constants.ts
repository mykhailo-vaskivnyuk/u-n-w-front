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
    CONFIRM: 'confirm/:token',
    RESTORE: 'restore/:token',
  },
  NET: {
    INDEX: 'net',
    CREATE: 'create',
    COMEOUT: 'comeout',
    LEAVE: 'leave',
    NET_NUMBER: {
      INDEX: ':net_id',
      CREATE: 'create',
      CIRCLE: {
        INDEX: 'circle',
        USER: 'user',
        MEMBER: ':member',
      },
      TREE: {
        INDEX: 'tree',
        USER: 'user',
        MEMBER: ':member',
      },
    },
  },
  PALETTE: 'palette',
  MAIL: 'mail',
};

export const RoutesMap = getRoutesMap(RelativeRoutesMap) as typeof RelativeRoutesMap;
