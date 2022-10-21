import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, mixins }) => ({
    '@global': {
      '@keyframes spin': {
        to: { transform: 'rotate(360deg)' },
      },
    },
    root: {
      //
    },
  }),
  { name: 'Loading' },
);
