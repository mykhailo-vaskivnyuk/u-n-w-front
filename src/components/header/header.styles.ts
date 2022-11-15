import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, mixins, vars }) => ({
    root: {
      height: '100%',
      ...mixins.flexCenter,
      color: palette.font.light,
      background: palette.bg.first,
      padding: vars.gap.main,
    },
    title: {
      flex: '1 0 0',
      padding: `0 ${vars.gap.main} 0 ${vars.gap.main}`,
      fontWeight: vars.fontWeight.bold,
      fontSize: vars.fontSize.M,
      lineHeight: vars.lineHeight.dense,
    },
    button: {
      width: 'auto',
      height: 'auto',
      padding: 0,
      color: palette.font.light,
    },
    hidden: {
      opacity: 0,
      pointerEvents: 'none',
    },
  }),
  { name: 'Header' },
);
