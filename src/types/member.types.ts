import { IMemberResponse } from '@api/api/types/types';
import { MemberStatusKeys } from '@api/constants';

export type IMember = Omit<IMemberResponse, 'member_name'> & {
  member_name: string;
  memberStatus: MemberStatusKeys;
};
