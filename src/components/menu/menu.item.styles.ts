import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, vars }) => ({
    root: {
      fontSize: vars.fontSize.L,
      fontWeight: vars.fontWeight.semiBold,
    },
    link: {
      display: 'flex',
      alignItems: 'center',
      gap: vars.gap.S,
      '&.active': {
        color: palette.second.main,
      },
    },
    icon: {
      color: 'currentColor',
    },
  }),
  { name: 'MenuItem' },
);
