import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ vars }) => ({
    buttons: {
      marginTop: vars.gap.XL,
    },
  }),
  { name: 'NetCreateForm' },
);
