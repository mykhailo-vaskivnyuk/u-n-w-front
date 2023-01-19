import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, vars }) => ({
    root: {
      height: 66,
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
  }),
  { name: 'SendMessage' },
);
