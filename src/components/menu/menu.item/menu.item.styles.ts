import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, vars }) => ({
    root: {
      fontSize: vars.fontSize.L,
    },
    button: {
      justifyContent: 'start',
      gap: vars.gap.S,
      textTransform: 'none',
      '&.active': {
        color: palette.second.main,
      },
      '& .icon': {
        margin: 0,
      },
    },
  }),
  { name: 'MenuItem' },
);
