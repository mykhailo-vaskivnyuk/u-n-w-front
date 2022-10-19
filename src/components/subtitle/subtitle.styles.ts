import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(({ palette, mixins, vars }) => ({
  root: {
    // height: '100%',
    ...mixins.flexCenter,
    // borderTop: '1px solid #000000',
    // padding: '6px 6px 6px 0',
    fontWeight: vars.fontWeight.bold,
    fontSize: vars.fontSize.extraLarge,
    // lineHeight: vars.lineHeight.dense,
    color: palette.cm_secondary.main,
    // background: palette.cm_primary.main,
    marginBottom: 20,
  },
}));
