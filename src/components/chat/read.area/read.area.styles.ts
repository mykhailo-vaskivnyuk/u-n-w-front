import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ vars }) => ({
    container: {
      flex: '1 0 0',
      overflow: 'auto',
      marginBottom: vars.gap.main,
      marginTop: -52,
      paddingTop: 64,
      marginRight: `-${vars.gap.main}`,
      paddingRight: vars.gap.main,
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
  }),
  { name: 'ReadArea' },
);
