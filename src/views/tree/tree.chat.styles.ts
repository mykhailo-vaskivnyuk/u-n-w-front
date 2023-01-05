import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ mixins, palette, vars }) => ({
    container: {
      ...mixins.size('100%'),
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    },
    readFieldContainer: {
      flex: '1 0 0',
      overflow: 'auto',
      marginBottom: vars.gap.main,
    },
    readField: {
      display: 'flex',
      flexDirection: 'column',
    },
    sendField: {
      display: 'flex',
      border: `1px solid ${palette.font.second}`,
      borderRadius: vars.radius.SS,
      overflow: 'hidden',
      '& textarea': {
        flex: '1 0 0',
        padding: vars.gap.S,
        color: palette.font.first,
      },
      '& button': {
        width: 50,
        background: palette.second.main,
        color: palette.font.light,
      },
    },
    message: {
      border: `1px solid ${palette.font.add}`,
      borderRadius: `0 0 ${vars.radius.main} 0`,
      background: palette.bg.light,
      padding: vars.gap.SS,
      minWidth: '75%',
      maxWidth: '75%',
      marginBottom: vars.gap.main,
      color: palette.font.add,
      fontSize: vars.fontSize.S,
      wordBreak: 'break-word',
      whiteSpace: 'pre',
      boxShadow: `4px 6px #00000022`,
      overflow: 'hidden',
      '&.myOwn': {
        alignSelf: 'end',
        borderRadius: `0 0 0 ${vars.radius.main}`,
        boxShadow: `-4px 6px #00000022`,
      },
    },
    name: {
      background: palette.bg.add,
      color: palette.font.light,
      margin: `-${vars.gap.SS} -${vars.gap.SS} ${vars.gap.SS} -${vars.gap.SS}`,
      fontSize: vars.fontSize.SS,
      paddingLeft: vars.gap.SS,
    },
  }),
  { name: 'TreeChat' },
);
