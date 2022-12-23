import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, mixins, vars }) => ({
    root: {
      ...mixins.flexCenter,
      margin: vars.gap.S,
      padding: vars.gap.main,
      background: palette.second.dark,
      color: palette.font.light,
      fontSize: vars.fontSize.M,
      fontWeight: vars.fontWeight.semiBold,
      '&.error': {
        background: palette.dark.dark,
      },
    },
  }),
  { name: 'Message' },
);
