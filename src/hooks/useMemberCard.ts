import { MemberCardProps } from '@components/member/card/member.card.types';
import { getMemberPosition } from '@utils/utils';
import { app } from '@api/app/client.app';

export const useMemberCard = (props: MemberCardProps) => {
  const { netView, memberUiPosition } = props;
  const memberPosition = getMemberPosition(netView, memberUiPosition);
  const { net, [netView]: netViewData } = app.getState();
  const member = netViewData[memberPosition];
  return [net, member, memberPosition] as const;
};
