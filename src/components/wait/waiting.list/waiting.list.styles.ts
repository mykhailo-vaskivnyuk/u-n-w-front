import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, vars }) => ({
    root: {
      height: '100%',
      wordBreak: 'break-all',
    },
    list: {
      flex: '1 0 0',
      color: palette.font.add,
      fontSize: vars.fontSize.L,
      fontWeigth: vars.fontWeight.bold,
    },
  }),
  { name: 'WaitingList' },
);
