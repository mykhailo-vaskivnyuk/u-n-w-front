import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, vars }) => ({
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'start',
      marginBottom: vars.gap.S,
    },
    button: {
      width: 24,
    },
    icon: {
      height: '100%',
      color: palette.second.dark,
      margin: 0,
    },
  }),
  { name: 'WaitItem' },
);
