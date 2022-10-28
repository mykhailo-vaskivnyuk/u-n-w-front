import { getRoutesMap } from './utils';

export const RelativeRoutesMap = {
  INDEX: '',
  ABOUTE: 'aboute',
  ACCOUNT: {
    INDEX: 'account',
    SIGNUP: 'signup',
    LOGIN: 'login',
    OVERMAIL: 'overmail',
    LOGOUT: 'logout',
    CONFIRM: 'confirm/*',
    RESTORE: 'restore/*',
  },
  PALETTE: 'palette',
};

export const RoutesMap = getRoutesMap(RelativeRoutesMap) as typeof RelativeRoutesMap;
