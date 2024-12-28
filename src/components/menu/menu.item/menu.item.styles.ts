import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, vars }) => ({
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    button: {
      justifyContent: 'start',
      gap: vars.gap.S,
      textTransform: 'none',
      '&.active': {
        color: palette.second.main,
      },
      '& .icon': {
        margin: 0,
      },
    },
    icon: {
      height: '100%',
      color: palette.second.dark,
      animationName: 'light',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'linear',
      animationDuration: vars.transition.XL,
    },
  }),
  { name: 'MenuItem' },
);
