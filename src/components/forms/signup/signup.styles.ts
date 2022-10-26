import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  {
    // '@global': {
    //   '@keyframes show': {
    //     from: { opacity: 0.5 },
    //     to: { opacity: 1 },
    //   },
    // },
    root: {
      width: '100%',
      padding: '0 48px',
      opacity: 1,
      // animationName: 'show',
      // animationDuration: '1s',
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
