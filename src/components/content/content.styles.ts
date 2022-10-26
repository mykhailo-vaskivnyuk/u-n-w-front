import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  {
    '@global': {
      '@keyframes show': {
        // from: { transform: 'scale(0.95)' },
        // to: { transform: 'scale(1)' },
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
      animationName: 'show',
      animationDuration: '2s',
    },
  },
  { name: 'Content' },
);
