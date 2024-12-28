import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, mixins, vars }) => ({
    root: {
      ...mixins.size('100%', '50%'),
      display: 'grid',
      gridAutoFlow: 'column',
      gridTemplateColumns: 'repeat(auto-fit, minmax(0, 1fr))',
      gridGap: vars.gap.SS,
      position: 'relative',
      '& button': {
        cursor: 'pointer',
        background: 'none', // palette.bg.add,
        textTransform: 'uppercase',
        border: '1px solid orange',
        zIndex: 1,
      },
      // color: palette.font.light,
      // padding: vars.gap.SS,
      // borderRadius: vars.radius.SS,
      // '&.secondary': {
      //   background: palette.bg.second,
      // },
      // '&.text': {
      //   ...mixins.size('auto'),
      //   display: 'block',
      //   background: 'none',
      //   padding: 0,
      //   margin: vars.gap.main,
      //   fontWeight: vars.fontWeight.bold,
      //   fontSize: vars.fontSize.M,
      //   lineHeight: vars.lineHeight.dense,
      // },
      // '&:link, &:visited': {
      //   color: palette.font.light,
      // },
    },
    slider: {
      height: '100%',
      position: 'absolute',
      background: palette.second.main,
      opacity: 0.5,
      pointerEvents: 'none',
      transition: `${vars.transition.quick} all ease-in`,
    },
  }),
  {
    name: 'Button',
  },
);
