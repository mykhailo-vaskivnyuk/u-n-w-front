import { mixins } from '@styles/mixins';
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
      ...mixins.flexCenter,
    },
  },
  { name: 'Member' },
);
