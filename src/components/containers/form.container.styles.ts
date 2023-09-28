import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ vars, palette }) => ({
    root: {
      width: '100%',
      padding: `0 ${vars.gap.XL}`,
    },
    modal: {
      width: 'unset',
      margin: vars.gap.S,
      padding: vars.gap.main,
      background: palette.bg.main,
    },
  }),
  { name: 'FormContainer' },
);
