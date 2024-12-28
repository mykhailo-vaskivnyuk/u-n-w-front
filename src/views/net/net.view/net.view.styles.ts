import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ vars }) => ({
    root: {
      height: '100%',
      display: 'grid',
      gridTemplateRows: 'repeat(8, minmax(60px, 1fr))',
      alignItems: 'center',
      gap: vars.gap.SS,
    },
  }),
  { name: 'NetView' },
);
