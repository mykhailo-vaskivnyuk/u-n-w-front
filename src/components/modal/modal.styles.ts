import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, vars, mixins }) => ({
    root: {
      ...mixins.size('100%'),
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 100,
      '&.closing': {
        '& $modal': {
          transform: 'translateY(-100%)',
        },
        '& $backdrop': {
          opacity: 0,
        },
      },
    },

    '@global': {
      '@keyframes modal': {
        from: {
          transform: 'translateY(-100%)',
        },
        to: {
          transform: 'translateY(60px)',
        },
      },
      '@keyframes backdrop': {
        from: {
          opacity: 0,
        },
        to: {
          opacity: 1,
        },
      },
    },

    backdrop: {
      ...mixins.size('100%'),
      backgroundColor: `${palette.bg.dark}${vars.opacityA.medium}`,
      position: 'absolute',
      top: 0,
      left: 0,
      opacity: 1,
      visibility: 'visible',
      animationName: 'backdrop',
      animationDuration: vars.transition.L,
      transitionProperty: 'opacity',
      transitionDuration: vars.transition.normal,
      transitionTimingFunction: vars.cubicBezier.easeInCirc,
      '&:focus': {
        outline: 'none',
      },
    },

    modal: {
      maxHeight: 'calc(100% - 60px)',
      transform: 'translateY(60px)',
      background: palette.bg.main,
      margin: '0 12px',
      borderRadius: 12,
      overflow: 'hidden',
      animationName: 'modal',
      animationDuration: vars.transition.L,
      transitionProperty: 'transform',
      transitionDuration: vars.transition.normal,
      transitionTimingFunction: vars.cubicBezier.easeInCirc,
    },

    /* custom modal elements */
    content: {},

    closeBtn: {
      position: 'absolute',
      top: 16,
      right: 24,
      color: palette.font.dark,
      cursor: 'pointer',
    },
  }),
  { name: 'Modal' },
);
