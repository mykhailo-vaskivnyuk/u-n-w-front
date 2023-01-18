import { createUseStyles } from 'react-jss';
import { MEMBER_STATUS_ENUM } from '@api/constants';

export const useStyles = createUseStyles(
  ({ palette, vars, mixins }) => ({
    root: {
      gridArea: 'status',
      ...mixins.size('100%'),
      ...mixins.flexCenter,
      color: palette.dark.extraLight,
      border: '1px solid transparent',
      borderRadius: vars.radius.S,
      fontSize: vars.fontSize.S,
      fontWeight: vars.fontWeight.semiBold,
      letterSpacing: vars.letterGap.XL,
      background: palette.bg.disabled,
      display: 'none',
      '&.dislike': {
        color: palette.font.light,
        background: palette.dark.main,
      },
    },
    [MEMBER_STATUS_ENUM.ACTIVE]: {
      display: 'flex',
    },
  }),
  { name: 'MemberDislike' },
);
