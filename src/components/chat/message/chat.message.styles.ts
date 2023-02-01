import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ mixins, palette, vars }) => ({
    root: {
      border: `1px solid ${palette.font.add}`,
      borderBottomWidth: 2,
      borderRadius: `0 0 ${vars.radius.main} 0`,
      background: palette.bg.light,
      minWidth: '75%',
      maxWidth: '75%',
      marginBottom: vars.gap.main,
      color: palette.font.add,
      boxShadow: `2px 4px #00000022`,
      overflow: 'hidden',
      '&.myOwn': {
        alignSelf: 'end',
        borderRadius: `0 0 0 ${vars.radius.main}`,
        boxShadow: `-2px 4px #00000022`,
        '& $name': {
          background: palette.bg.second,
        },
      },
    },
    name: {
      background: palette.bg.add,
      color: palette.font.light,
      padding: vars.gap.SS,
      ...mixins.oneLineOverflow(),
    },
    message: {
      padding: vars.gap.SS,
      wordBreak: 'break-word',
      whiteSpace: 'pre-line',
    },
  }),
  { name: 'ChatMessage' },
);
