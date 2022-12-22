import { ITableUsers, ITableUsersNodesInvites } from '../../../local/imports';
import { DbRecordOrNull } from '../../types';

export type IMemberInviteParams = {
  node_id: number;
  member_name: string;
}

export type IMemberResponse =
  Pick<ITableUsers, 'name'> &
  DbRecordOrNull<Omit<ITableUsersNodesInvites, 'node_id'>> & {
    node_id: number;
  };

export const MEMBER_STATUS_MAP = {
  ACTIVE: 'active',
  CONNECTED: 'connected',
  INVITING: 'inviting',
  EMPTY: 'empty',
};

export type MemberStatusKeys = keyof typeof MEMBER_STATUS_MAP;
