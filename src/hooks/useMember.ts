import { app } from '@api/app/client.app';
import { getMemberName } from '@utils/utils';

export const useMember = () => {
  const { netView, memberPosition } = app.getState();
  const netViewData = app.getState()[netView!];
  const member = netViewData[memberPosition!];
  const memberName = getMemberName(netView!, member, memberPosition!);
  return { ...member, member_name: memberName };
};
