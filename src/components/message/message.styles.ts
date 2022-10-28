import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, mixins, vars }) => ({
    root: {
      margin: 12,
      padding: 10,
      borderRadius: 5,
      color: palette.font.light,
      background: palette.bg.second,
      fontSize: vars.fontSize.large,
      fontWeight: vars.fontWeight.bold,
      ...mixins.flexCenter,
      '&.error': {
        background: palette.bg.extraDark,
      },
    },
  }),
  { name: 'Message' },
);
