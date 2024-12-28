import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  {
    root: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 0',
      marginTop: 60,
    },
  },
  { name: 'Member' },
);
