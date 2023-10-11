import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ mixins, vars }) => ({
    root: {
      height: '100%',
      ...mixins.flexCenter,
      flexDirection: 'column',
      wordBreak: 'break-all',
      textAlign: 'center',
    },
    menuRoot: {
      flex: '0 0 0',
      fontSize: vars.fontSize.XL,
    },
  }),
  { name: 'Main' },
);
