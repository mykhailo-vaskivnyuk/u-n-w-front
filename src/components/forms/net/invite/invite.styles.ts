import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ vars }) => ({
    buttons: {
      display: 'grid',
      gridTemplateRows: '2fr 1fr',
      gap: 5,
      marginTop: vars.gap.XL,
    },
  }),
  { name: 'MemberConfirm' },
);
