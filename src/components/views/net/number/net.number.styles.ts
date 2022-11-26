import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ vars, palette }) => ({
    container: {
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      overflowY: 'auto',
    },
    root: {
      width: '100%',
      height: '100%',
      display: 'grid',
      gridTemplateColumns: '100% 100%',
      gridTemplateRows: '1fr',
      gap: vars.gap.main,
      position: 'relative',
      transition: `${vars.transition.L} left ease-in`,
    },
    netView: {
      height: '100%',
      display: 'grid',
      gridTemplateRows: 'repeat(8, minmax(60px, auto))',
      alignItems: 'center',
      gap: vars.gap.SS,
    },
    viewButton: {
      color: palette.add.main,
      justifySelf: 'center',
      fontWeight: vars.fontWeight.semiBold,
    },
    tree: {
      '& $viewButton': {
        // justifyContent: 'start',
        transform: `translateX(calc(50% - ${vars.gap.main} - ${vars.gap.S}))`,
      },
    },
    circle: {
      '& $viewButton': {
        // justifyContent: 'end',
        transform: `translateX(calc(-50% + ${vars.gap.main} + ${vars.gap.S}))`,
      },
    },
  }),
  { name: 'NetMain' },
);
