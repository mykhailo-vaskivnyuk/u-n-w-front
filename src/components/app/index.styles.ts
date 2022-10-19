import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, breakpoints }) => ({
    // '@global': {
    //   '*': {
    //     boxSizing: 'border-box',
    //   },
    //   'ul, body': {
    //     margin: 0,
    //   },
    //   img: {
    //     maxWidth: '100%',
    //   },
    // },
    root: {
      width: '100%',
      height: '100%',
      margin: '0 auto',
      display: 'grid',
      gridTemplateRows: '60px 1fr 40px',
      gap: 5,
      //
      // textAlign: 'center',
      background: palette.cm_background.main,
      position: 'relative',
      overflow: 'hidden',
      borderRadius: 12,
      [breakpoints.up(480)]: {
        width: 480,
      },
    },
    gallery: {
      height: 550,
      position: 'relative',
    },
  }),
  { name: 'appRoot' },
);
