import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ vars }) => ({
    root: {
      flex: '1 0 0',
      padding: vars.gap.L,
      paddingLeft: vars.gap.XL,
    },
  }),
  { name: 'Menu' },
);
