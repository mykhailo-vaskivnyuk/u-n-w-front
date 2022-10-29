import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ vars }) => ({
    root: {
      width: '100%',
      padding: `0 ${vars.gap.XL}`,
    },
  }),
  { name: 'FormContainer' },
);
