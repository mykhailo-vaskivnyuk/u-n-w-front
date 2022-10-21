import Color from 'color';
import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, vars, mixins }) => ({
    root: {
      ...mixins.size('100%'),
      ...mixins.flexCenter,
      flexDirection: 'column',
      position: 'absolute',
      top: 0,
      left: 0,
      overflow: 'hidden',
      '&.closing': {
        '& $modal': {
          top: '100%',
        },
        '& $backdrop': {
          opacity: 0,
        },
      },
    },

    '@global': {
      '@keyframes modal': {
        from: {
          top: '100%',
        },
        to: {
          top: 0,
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
      backgroundColor: Color(palette.cm_dark.main).alpha(0.75).rgb().toString(),
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: vars.zIndex.backdrop,
      opacity: 1,
      visibility: 'visible',
      animationName: 'backdrop',
      animationDuration: '0.75s',
      transitionProperty: 'opacity',
      transitionDuration: vars.transition.long,
      transitionTimingFunction: vars.cubicBezier.easeInCirc,
      '&:focus': {
        outline: 'none',
      },
    },

    modal: {
      width: '100%',
      position: 'relative',
      top: 0,
      marginTop: 60,
      flex: '1 0 0',
      background: 'white',
      borderRadius: '12px 12px 0px 0px',
      display: 'flex',
      flexDirection: 'column',
      zIndex: vars.zIndex.modal,
      overflow: 'hidden',
      animationName: 'modal',
      animationDuration: '0.75s',
      transitionProperty: 'top',
      transitionDuration: vars.transition.normal,
      transitionTimingFunction: vars.cubicBezier.easeInCirc,
    },

    /* custom modal elements */
    content: {
      flex: '1 0 0',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: 'black',
      margin: '50px 0 20px 20px',
      paddingRight: 20,
    },

    closeBtn: {
      position: 'absolute',
      top: 16,
      right: 24,
      color: palette.cm_grey.dark,
      cursor: 'pointer',
    },
  }),
  { name: 'Modal' },
);
