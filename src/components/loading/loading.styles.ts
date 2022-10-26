import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, mixins }) => ({
    '@global': {
      '@keyframes spin': {
        to: { transform: 'rotate(360deg)' },
      },
    },
    root: {
      position: 'absolute',
      ...mixins.size('100%'),
      ...mixins.flexCenter,
      background: `${palette.cm_background.main}cc`,
      zIndex: 200,
    },
    icon: {
      ...mixins.size(100),
      color: palette.cm_primary.main,
      animationName: 'spin',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'linear',
      animationDuration: '3s',
      '& path:first-child': {
        color: palette.cm_secondary.main,
      },
    },
  }),
  { name: 'Loading' },
);
