import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ vars, palette }) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: vars.gap.S,
      borderLeft: '2px solid',
      borderColor: palette.first.main,
      paddingLeft: vars.gap.SS,
      paddingRight: vars.gap.SS,
      '&>span:first-child': {
        color: palette.add.main,
      },
      '&>span:last-child': {
        color: palette.second.main,
        userSelect: 'text',
        fontSize: vars.fontSize.M,
      },
    },
  }),
  { name: 'WaitingItem' },
);
