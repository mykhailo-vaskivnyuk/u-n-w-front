import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ mixins, vars, palette }) => ({
    root: {
      height: '100%',
      ...mixins.flexCenter,
      flexDirection: 'column',
    },
    title: {
      fontSize: 200,
      fontWeight: vars.fontWeight.bold,
      color: palette.font.dark,
    },
    button: {
      width: '50%',
    },
  }),
  { name: 'NotFound' },
);
