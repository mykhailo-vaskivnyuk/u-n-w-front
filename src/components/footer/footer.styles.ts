import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, mixins, vars }) => ({
    root: {
      height: '100%',
      ...mixins.flexCenter,
      fontWeight: vars.fontWeight.bold,
      fontSize: vars.fontSize.large,
      lineHeight: vars.lineHeight.dense,
      color: palette.font.light,
      background: palette.bg.first,
    },
  }),
  { name: 'Footer' },
);
