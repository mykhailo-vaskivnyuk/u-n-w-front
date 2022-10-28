import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      padding: '0 36px',
    },
    buttons: {
      display: 'grid',
      gridTemplateRows: '2fr 1fr 2fr',
      gap: 5,
      marginTop: 30,
    },
  },
  { name: 'Auth' },
);
