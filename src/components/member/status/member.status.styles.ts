import { MEMBER_STATUS_ENUM } from '@api/api/types/member.types';
import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, vars, mixins }) => ({
    root: {
      gridArea: 'status',
      ...mixins.size('100%'),
      ...mixins.flexCenter,
      color: palette.font.light,
      borderRadius: vars.radius.S,
      fontSize: vars.fontSize.S,
      fontWeight: vars.fontWeight.semiBold,
      letterSpacing: vars.letterGap.XL,
    },
    [MEMBER_STATUS_ENUM.ACTIVE]: {
      opacity: 0,
    },
    [MEMBER_STATUS_ENUM.CONNECTED]: {
      background: palette.add.main,
    },
    [MEMBER_STATUS_ENUM.INVITED]: {
      background: palette.second.medium,
    },
    [MEMBER_STATUS_ENUM.EMPTY]: {
      background: palette.dark.main,
    },
  }),
  { name: 'MemberStatus' },
);
