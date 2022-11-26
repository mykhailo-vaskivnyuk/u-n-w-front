import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, vars }) => ({
    root: {
      color: palette.font.first,
      background: palette.first.extraLight,
    },
    section: {
      display: 'flex',
      '& li': {
        marginLeft: vars.gap.main,
      },
    },
  }),
  { name: 'NetMenu' },
);
