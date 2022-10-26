import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ mixins, vars, palette }) => ({
    root: {
      height: '100%',
      ...mixins.flexCenter,
      flexDirection: 'column',
      '& pre': {
        wordBreak: 'break-word',
        whiteSpace: 'pre-wrap',
      },
    },
    content: {
      fontSize: 50,
      fontWeight: vars.fontWeight.bold,
      color: palette.cm_secondary.main,
    },
  }),
  { name: 'Main' },
);
