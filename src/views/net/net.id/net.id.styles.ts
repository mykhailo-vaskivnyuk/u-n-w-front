import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ mixins, vars }) => ({
    container: {
      ...mixins.size('100%'),
      overflow: 'hidden',
      overflowY: 'auto',
    },
    root: {
      ...mixins.size('100%'),
      display: 'grid',
      gridTemplateColumns: '100% 100%',
      gridTemplateRows: '1fr',
      gap: vars.gap.main,
      position: 'relative',
      transition: `${vars.transition.normal} left ease-in`,
      '&.tree': {
        left: 0,
      },
      '&.circle': {
        left: `calc(-100% - ${vars.gap.main})`,
      },
    },
  }),
  { name: 'NetId' },
);
