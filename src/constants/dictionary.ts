import { MemberStatusKeys } from '@app/common/server/constants';

export const CHAT_NAME = {
  net: 'Чат спільноти',
  tree: 'Чат дерева',
  circle: 'Чат кола',
};

export const MEMBER_STATUS_TEXT: Record<MemberStatusKeys, string> = {
  UNAVAILABLE: 'НЕДОСТУПНИЙ',
  EMPTY: 'ПУСТО',
  FREE: 'ВІЛЬНО',
  INVITED: 'ЗАПРОШЕНИЙ',
  CONNECTED: 'НОВИЙ',
  ACTIVE: 'АКТИВНИЙ',
};

export const NET_VIEW_NAME = {
  net: 'Спільнота',
  tree: 'Дерево',
  circle: 'Коло',
};
