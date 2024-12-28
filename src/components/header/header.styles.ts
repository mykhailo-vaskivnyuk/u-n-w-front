import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, mixins, vars }) => ({
    root: {
      zIndex: 1,
      height: '100%',
      ...mixins.flexCenter,
      color: palette.font.light,
      background: palette.bg.first,
      padding: vars.gap.main,
    },
    titleButton: {
      flex: '1 0 0',
    },
    button: {
      width: 'auto',
      height: 'auto',
      padding: 0,
      color: palette.font.light,
    },
    hidden: {
      display: 'none',
    },
    icon: {
      height: '100%',
      color: palette.font.second,
      animationName: 'light',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'linear',
      animationDuration: vars.transition.XL,
    },
  }),
  { name: 'Header' },
);
