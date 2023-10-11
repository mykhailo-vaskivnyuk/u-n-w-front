import { getRoutesMap } from '../router/utils';

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
    MESSENGER: 'messenger',
  },
  NET: {
    INDEX: 'net',
    CREATE: 'create',
    INVITE: 'invite/:token',
    NET_ID: {
      INDEX: ':net_id',
      GOAL: 'goal',
      INFO: 'info',
      CREATE: 'create',
      LEAVE: 'leave',
      CHAT: 'chat',
      BOARD: 'board',
      CIRCLE: {
        INDEX: 'circle',
        USER: 'user',
        CHAT: 'chat',
        NODE_ID: {
          INDEX: ':node_id',
        },
      },
      TREE: {
        INDEX: 'tree',
        USER: 'user',
        CHAT: 'chat',
        NODE_ID: {
          INDEX: ':node_id',
          INVITE: 'invite',
          CONNECTED: 'connected',
        },
      },
    },
  },
  PALETTE: 'palette',
  MAIL: 'mail',
};

export const RoutesMap = getRoutesMap(RelativeRoutesMap) as typeof RelativeRoutesMap;
