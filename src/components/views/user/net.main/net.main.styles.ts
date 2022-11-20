import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ mixins, vars, palette }) => ({
    container: {
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      display: 'grid',
      gridTemplateRows: '50px 1fr',
      gap: vars.gap.S,
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
      gridTemplateRows: 'repeat(8, 1fr)',
      alignItems: 'center',
      gap: vars.gap.SS,
    },
    viewButton: {
      color: palette.add.main,
      justifySelf: 'center',
      width: '50%',
    },
    tree: {
      '& $viewButton': {
        justifyContent: 'start',
        transform: `translateX(calc(50% - ${vars.gap.main} - ${vars.gap.S}))`,
        '& svg': {
          transform: 'rotate(180deg)',
        },
      },
    },
    circle: {
      '& $viewButton': {
        justifyContent: 'end',
        transform: `translateX(calc(-50% + ${vars.gap.main} + ${vars.gap.S}))`,
      },
    },
    menu: {
      height: '100%',
      ...mixins.flexCenter,
      border: '1px dotted #000000',
    },
    member: {
      height: '100%',
      ...mixins.flexCenter,
      border: '1px dotted #000000',
    },
  }),
  { name: 'Members' },
);
