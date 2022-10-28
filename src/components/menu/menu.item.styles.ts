import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, mixins, vars }) => ({
    root: {
      color: palette.font.first,
      fontSize: 32,
      fontWeight: vars.fontWeight.semiBold,
    },
    link: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
    },
    icon: {
      ...mixins.size(30),
      color: palette.font.second,
      marginRight: 12,
    },
  }),
  { name: 'MenuItem' },
);
