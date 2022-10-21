import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, mixins, vars }) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      color: palette.cm_primary.main,
      marginLeft: -40,
      fontSize: 36,
      fontWeight: vars.fontWeight.semiBold,
    },
    icon: {
      ...mixins.size(30),
      color: palette.cm_secondary.main,
    },
  }),
  { name: 'MenuItem' },
);
