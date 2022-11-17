import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, mixins, vars }) => ({
    root: {
      margin: vars.gap.S,
      padding: vars.gap.main,
      color: palette.font.light,
      background: palette.second.dark,
      fontSize: vars.fontSize.M,
      fontWeight: vars.fontWeight.semiBold,
      ...mixins.flexCenter,
      '&.error': {
        background: palette.bg.extraDark,
      },
    },
  }),
  { name: 'Message' },
);
