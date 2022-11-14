import { palette } from '@styles/palette';
import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ vars }) => ({
    root: {
      flex: '1 0 0',
      padding: vars.gap.main,
      paddingLeft: vars.gap.L,
      paddingRight: vars.gap.L,
    },
    section: {
      padding: `${vars.gap.S} 0`,
      borderBottom: `2px solid ${palette.add.main}`,
      '&:last-child': {
        border: 'none',
      },
    },
  }),
  { name: 'Menu' },
);
