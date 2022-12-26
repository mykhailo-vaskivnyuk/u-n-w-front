import {
  ITableUsers, ITableUsersNodesInvites, getEnumFromMap
} from '../../../local/imports';
import { DbRecordOrNull } from '../../types';

export type IMemberInviteParams = {
  node_id: number;
  member_name: string;
}

export type IMemberConfirmParams = {
  node_id: number;
}

export type IMemberResponse =
  Pick<ITableUsers, 'name'> &
  DbRecordOrNull<Omit<ITableUsersNodesInvites, 'node_id'>> & {
    node_id: number;
  };

export const MEMBER_STATUS_MAP = {
  UNAVAILABLE: 'unavailable',
  EMPTY: 'empty',
  INVITED: 'invited',
  CONNECTED: 'connected',
  ACTIVE: 'active',
};

export type MemberStatusKeys = keyof typeof MEMBER_STATUS_MAP;
export const MEMBER_STATUS_ENUM = getEnumFromMap(MEMBER_STATUS_MAP);
