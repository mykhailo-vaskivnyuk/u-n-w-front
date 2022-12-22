import { IMemberResponse, MemberStatusKeys } from '@api/api/types/types';

export type IMember = Omit<IMemberResponse, 'member_name'> & {
  member_name: string;
  memberStatus: MemberStatusKeys;
};
