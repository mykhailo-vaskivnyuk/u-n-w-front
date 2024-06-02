import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ vars, palette }) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: vars.gap.S,
      border: '1px solid',
      borderColor: palette.second.main,
      padding: vars.gap.SS,
      borderRadius: vars.radius.S,
    },
  }),
  { name: 'WaitingItem' },
);
