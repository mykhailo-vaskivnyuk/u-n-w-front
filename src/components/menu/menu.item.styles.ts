import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, mixins, vars }) => ({
    root: {
      color: palette.font.first,
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
      ...mixins.size(30),
      color: palette.font.second,
      marginRight: vars.gap.main,
    },
  }),
  { name: 'MenuItem' },
);
