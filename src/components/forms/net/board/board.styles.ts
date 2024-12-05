import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ vars }) => ({
    buttons: {
      display: 'flex',
      marginTop: vars.gap.main,
      gap: vars.gap.S,
      '& button': {
        borderRadius: vars.radius.S,
      },
    },
  }),
  { name: 'NetBoard' },
);
