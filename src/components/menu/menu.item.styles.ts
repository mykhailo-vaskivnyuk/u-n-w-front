import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, mixins, vars }) => ({
    root: {
      color: palette.cm_primary.main,
      fontSize: 36,
      fontWeight: vars.fontWeight.semiBold,
    },
    link: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
    },
    icon: {
      ...mixins.size(30),
      color: palette.cm_secondary.main,
    },
  }),
  { name: 'MenuItem' },
);
