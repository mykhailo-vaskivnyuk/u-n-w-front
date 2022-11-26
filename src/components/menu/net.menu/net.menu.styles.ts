import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, vars }) => ({
    root: {
      color: palette.first.main,
      background: palette.light.main,
    },
    section: {
      display: 'flex',
      '& > *': {
        marginLeft: vars.gap.main,
      },
    },
  }),
  { name: 'NetMenu' },
);
