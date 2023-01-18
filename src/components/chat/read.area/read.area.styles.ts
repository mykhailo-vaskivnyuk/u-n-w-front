import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ vars }) => ({
    container: {
      flex: '1 0 0',
      overflow: 'auto',
      marginTop: vars.gap.main,
      marginBottom: vars.gap.main,
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
  }),
  { name: 'ReadArea' },
);
