import { IMemberResponse } from '@server/types/types';
import { MemberStatusKeys } from '@server/constants';

export type IMember = Omit<IMemberResponse, 'member_name'> & {
  member_name: string;
  memberStatus: MemberStatusKeys;
};
