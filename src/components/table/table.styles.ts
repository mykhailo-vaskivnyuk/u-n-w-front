import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ mixins, vars, palette }) => ({
    root: {
      color: palette.font.light,
      fontSize: vars.fontSize.M,
      display: 'grid',
      gap: vars.gap.main,
    },
    row: {
      display: 'grid',
      gridTemplateColumns: '8fr 2fr',
      gap: vars.gap.main,
      '& *': {
        padding: vars.gap.S,
        borderRadius: vars.radius.S,
        background: palette.add.main,
      },
      '& *:nth-child(2n)': {
        background: palette.second.main,
        ...mixins.flexCenter,
      },
    },
  }),
  { name: 'Table' },
);
