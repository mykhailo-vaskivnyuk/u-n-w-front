import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, mixins, vars }) => ({
    root: {
      margin: 12,
      padding: 10,
      borderRadius: 5,
      color: palette.cm_background.light,
      background: palette.cm_secondary.main,
      fontSize: vars.fontSize.large,
      fontWeight: vars.fontWeight.bold,
      ...mixins.flexCenter,
      '&.error': {
        background: '#333333',
      },
    },
  }),
  { name: 'Message' },
);
