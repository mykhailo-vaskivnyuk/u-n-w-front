import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, mixins, vars }) => ({
    '@global': {
      '@keyframes spin': {
        to: { transform: 'rotate(360deg)' },
      },
    },
    root: {
      position: 'absolute',
      ...mixins.size('100%'),
      ...mixins.flexCenter,
      background: `${palette.bg.main}${vars.opacityA.light}`,
      zIndex: vars.zIndex.loading,
    },
    icon: {
      ...mixins.size(100),
      color: palette.font.first,
      animationName: 'spin',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'linear',
      animationDuration: vars.transition.XXL,
      '& g:first-child': {
        color: palette.font.second,
      },
    },
  }),
  { name: 'Loading' },
);
