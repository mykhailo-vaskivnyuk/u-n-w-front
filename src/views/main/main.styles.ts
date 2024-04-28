import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ vars }) => ({
    root: {
      height: '100%',
      flexDirection: 'column',
      wordBreak: 'break-all',
    },
    menuRoot: {
      flex: '0 0 0',
      fontSize: vars.fontSize.XL,
      width: '100%',
      textAlign: 'center',
    },
  }),
  { name: 'Main' },
);
