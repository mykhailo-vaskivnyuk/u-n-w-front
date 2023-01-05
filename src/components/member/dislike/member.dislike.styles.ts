import { MEMBER_STATUS_ENUM } from '@api/api/types/member.types';
import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, vars, mixins }) => ({
    root: {
      gridArea: 'status',
      ...mixins.size('100%'),
      ...mixins.flexCenter,
      color: palette.font.light,
      border: '1px solid',
      borderRadius: vars.radius.S,
      fontSize: vars.fontSize.S,
      fontWeight: vars.fontWeight.semiBold,
      letterSpacing: vars.letterGap.XL,
      background: palette.bg.disabled,
      display: 'none',
      '&.dislike': {
        background: palette.dark.main,
      },
    },
    [MEMBER_STATUS_ENUM.ACTIVE]: {
      display: 'flex',
    },
  }),
  { name: 'MemberDislike' },
);
