import Color from 'color';
import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, vars, mixins }) => ({
    root: {
      ...mixins.size('100%'),
      position: 'absolute',
      top: 0,
      left: 0,
      ...mixins.flexCenter,
      flexDirection: 'column',
      overflow: 'hidden',
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
      '&:focus': {
        outline: 'none',
      },
    },

    modal: {
      // height: 'auto',
      // ...mixins.size('100%'),
      width: '100%',
      position: 'relative',
      marginTop: 60,
      flex: '1 0 0',
      background: 'white',
      borderRadius: '12px 12px 0px 0px',
      // minHeight: 250,
      // maxHeight: 'calc(100vh - 50px)',
      // width: '100%',
      // minWidth: 300,
      // maxWidth: 690,
      // margin: 25,
      display: 'flex',
      flexDirection: 'column',
      zIndex: vars.zIndex.modal,
      // background: palette.cm_light.main,
      overflow: 'hidden', // overflowY: 'auto',
    },

    /* custom modal elements */
    content: {
      height: '100%',
      overflow: 'hidden', // overflow: 'auto',
      display: 'flex',
      flexDirection: 'column',
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
