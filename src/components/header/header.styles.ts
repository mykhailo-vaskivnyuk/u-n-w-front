import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, mixins, vars }) => ({
    root: {
      height: '100%',
      ...mixins.flexCenter,
      color: palette.font.light,
      background: palette.bg.first,
      padding: 12,
    },
    title: {
      flex: '1 0 0',
      padding: '0 36px 0 12px',
      fontWeight: vars.fontWeight.bold,
      fontSize: vars.fontSize.large,
      lineHeight: vars.lineHeight.dense,
    },
    button: {
      width: 'auto',
      height: 'auto',
      padding: 0,
      color: palette.font.light,
    },
  }),
  { name: 'Header' },
);
