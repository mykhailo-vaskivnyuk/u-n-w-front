import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ mixins, vars, palette }) => ({
    root: {
      height: '100%',
      ...mixins.flexCenter,
      flexDirection: 'column',
    },
    content: {
      fontSize: vars.fontSize.XXL,
      fontWeight: vars.fontWeight.bold,
      color: palette.font.second,
    },
  }),
  { name: 'Net' },
);
