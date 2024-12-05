import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ mixins, vars }) => ({
    root: {
      ...mixins.size('100%'),
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: '50px repeat(4, minmax(100px, auto))',
      gap: vars.gap.M,
      fontSize: vars.fontSize.main,
      '& *:first-child': {
        gridColumnStart: 1,
        gridColumnEnd: 3,
        alignSelf: 'center',
      },
    },
  }),
  { name: 'NetBoard' },
);
