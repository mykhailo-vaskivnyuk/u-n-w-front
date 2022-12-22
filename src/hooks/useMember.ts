import { IMember } from '@project-types/member.types';
import { MemberStatusKeys } from '@api/api/types/member.types';
import { getMemberName } from '@utils/utils';
import { app } from '@api/app/client.app';

export const useMember = (): IMember => {
  const { netView, memberPosition } = app.getState();
  const netViewData = app.getState()[netView!];
  const member = netViewData[memberPosition!];
  const memberName = getMemberName(netView!, member, memberPosition!);
  const { name, token } = member;
  let memberStatus: MemberStatusKeys = 'EMPTY';
  if (name) {
    if (token) memberStatus = 'CONNECTED';
    else memberStatus = 'ACTIVE';
  } else if (token) memberStatus = 'INVITING';
  return { ...member, member_name: memberName, memberStatus };
};
