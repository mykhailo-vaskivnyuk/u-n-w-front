import { palette } from '@styles/palette';
import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ vars }) => ({
    root: {
      flex: '1 0 0',
      padding: vars.gap.main,
      paddingLeft: vars.gap.L,
      paddingRight: vars.gap.L,
      color: palette.font.first,
      fontSize: vars.fontSize.L,
    },
    section: {
      padding: `${vars.gap.S} 0`,
      '&:last-child': {
        border: 'none',
      },
    },
    parentItems: {
      color: palette.add.dark,
    },
  }),
  { name: 'Menu' },
);
