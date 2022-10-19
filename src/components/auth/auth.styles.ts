import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(({ palette }) => ({
  root: {
    width: '100%',
    padding: '0 48px',
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
  },
  buttons: {
    display: 'grid',
    // flexDirection: 'column',
    gridTemplateRows: '2fr 1fr 2fr 2fr',
    gap: 5,
    marginTop: 30,
    alignItems: 'end',
        // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
  }
}));
