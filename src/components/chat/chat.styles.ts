import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ mixins }) => ({
    container: {
      ...mixins.size('100%'),
      display: 'flex',
      flexDirection: 'column',
    },
  }),
  { name: 'Chat' },
);
