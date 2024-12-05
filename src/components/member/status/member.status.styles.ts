import { createUseStyles } from 'react-jss';
import { MEMBER_STATUS_ENUM } from '@client/constants';

export const useStyles = createUseStyles(
  ({ palette, vars, mixins }) => ({
    root: {
      gridArea: 'status',
      ...mixins.size('100%'),
      ...mixins.flexCenter,
      color: palette.font.light,
      border: '1px solid transparent',
      borderRadius: vars.radius.S,
      fontSize: 14,
      fontWeight: vars.fontWeight.semiBold,
      letterSpacing: vars.letterGap.XL,
    },
    [MEMBER_STATUS_ENUM.ACTIVE]: {
      display: 'none',
    },
    [MEMBER_STATUS_ENUM.CONNECTED]: {
      background: palette.add.main,
    },
    [MEMBER_STATUS_ENUM.INVITED]: {
      background: palette.second.medium,
    },
    [MEMBER_STATUS_ENUM.FREE]: {
      color: palette.dark.main,
      border: `1px solid ${palette.dark.main}`,
    },
    [MEMBER_STATUS_ENUM.EMPTY]: {
      background: palette.dark.main,
    },
  }),
  { name: 'MemberStatus' },
);
