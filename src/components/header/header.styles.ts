import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(({ palette, mixins, vars }) => ({
  root: {
    height: '100%',
    ...mixins.flexCenter,
    // border: '1px dotted #000000',
    // display: 'flex',
    color: palette.cm_background.light,
    background: palette.cm_primary.main,
    padding: 12,
  },
  title: {
    flex: '1 0 0',
    padding: '0 36px 0 12px',
    fontWeight: vars.fontWeight.bold,
    fontSize: vars.fontSize.large,
    lineHeight: vars.lineHeight.dense,
  },
  button: {
    width: 'auto',
    height: 'auto',
    padding: 0,
    color: palette.cm_background.light,
  },
}));
