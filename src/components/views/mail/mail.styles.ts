import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ mixins, vars, palette }) => ({
    root: {
      position: 'fixed',
      top: 0,
      left: 0,
      ...mixins.size('100%'),
      ...mixins.flexCenter,
      background: palette.bg.dark,
      lineHeight: 'initial',
    },
    content: {
      width: '100%',
      maxWidth: vars.width.maxWidth,
      minWidth: vars.width.minWidth,
      background: palette.bg.add,
      border: `1px solid ${palette.add.main}`,
      fontFamily: 'Arial',
    },
    header: {
      color: palette.font.light,
      fontSize: vars.fontSize.XL,
      fontWeight: vars.fontWeight.semiBold,
      padding: vars.gap.M,
    },
    body: {
      padding: vars.gap.M,
      fontSize: vars.fontSize.M,
      background: palette.bg.main,
      borderRadius: vars.radius.S,
      color: palette.second.light,
      '& a': {
        background: palette.bg.first,
        color: palette.font.light,
        width: '100%',
        display: 'block',
        padding: vars.gap.S,
        textAlign: 'center',
        borderRadius: vars.radius.SS,
        marginTop: vars.gap.L,
      },
    },
    footer: {
      height: 20,
    },
  }),
  { name: 'Mail' },
);
