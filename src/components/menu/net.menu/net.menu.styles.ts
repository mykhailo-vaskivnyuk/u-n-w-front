import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette }) => ({
    root: {
      color: palette.font.first,
      background: palette.first.extraLight,
    },
    section: {
      display: 'flex',
    },
  }),
  { name: 'NetMenu' },
);
