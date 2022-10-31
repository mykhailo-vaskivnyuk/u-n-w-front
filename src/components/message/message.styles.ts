import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, mixins, vars }) => ({
    root: {
      margin: vars.gap.S,
      padding: vars.gap.main,
      borderRadius: vars.radius.S,
      color: palette.font.light,
      background: palette.bg.second,
      fontSize: vars.fontSize.M,
      fontWeight: vars.fontWeight.semiBold,
      ...mixins.flexCenter,
      textAlign: 'justify',
      '&.error': {
        background: palette.bg.extraDark,
      },
    },
  }),
  { name: 'Message' },
);
