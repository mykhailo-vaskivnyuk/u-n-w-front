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
    NET_ID: {
      INDEX: ':net_id',
      CREATE: 'create',
      CIRCLE: {
        INDEX: 'circle',
        USER: 'user',
        NODE_ID: {
          INDEX: ':node_id',
        },
      },
      TREE: {
        INDEX: 'tree',
        USER: 'user',
        NODE_ID: {
          INDEX: ':node_id',
          INVITE: 'invite',
        },
      },
    },
  },
  PALETTE: 'palette',
  MAIL: 'mail',
};

export const RoutesMap = getRoutesMap(RelativeRoutesMap) as typeof RelativeRoutesMap;
