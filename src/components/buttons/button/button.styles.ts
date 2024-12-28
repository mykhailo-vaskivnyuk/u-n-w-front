import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, mixins, vars }) => ({
    root: {
      ...mixins.size('100%', 36),
      ...mixins.flexCenter,
      background: palette.bg.add,
      color: palette.font.light,
      padding: vars.gap.SS,
      borderRadius: vars.radius.SS,
      textTransform: 'uppercase',
      cursor: 'pointer',
      '&:link, &:visited': {
        color: palette.font.light,
      },
      '&.secondary': {
        background: palette.bg.second,
      },
      '&.telegram': {
        background: palette.bg.first,
      },
      '&.refuse': {
        background: palette.bg.dark,
      },
      '&.text': {
        ...mixins.size('auto'),
        display: 'block',
        background: 'none',
        padding: 0,
        margin: `0 ${vars.gap.main}`,
        fontWeight: vars.fontWeight.bold,
        fontSize: vars.fontSize.M,
        lineHeight: vars.lineHeight.dense,
      },
    },
  }),
  {
    name: 'Button',
  },
);
