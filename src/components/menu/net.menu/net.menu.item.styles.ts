import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, vars }) => ({
    root: {
      fontSize: vars.fontSize.L,
      fontWeight: vars.fontWeight.semiBold,
      marginLeft: vars.gap.main,
    },
    link: {
      display: 'flex',
      alignItems: 'center',
      gap: vars.gap.S,
      '&.active': {
        color: palette.second.main,
      },
    },
  }),
  { name: 'NetMenuItem' },
);
