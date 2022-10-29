import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ vars }) => ({
    '@global': {
      '@keyframes showContent': {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
    },
    root: {
      height: '100%',
      overflow: 'auto',
      padding: 12,
    },
    animation: {
      animationName: 'showContent',
      animationDuration: vars.transition.XL,
    },
  }),
  { name: 'Content' },
);
