import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  {
    buttons: {
      display: 'grid',
      gridTemplateRows: '2fr 1fr 2fr 2fr',
      gap: 5,
      marginTop: 30,
      alignItems: 'end',
    },
  },
  { name: 'AccountForm' },
);
