import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, breakpoints }) => ({
    root: {
      width: '100%',
      height: '100%',
      margin: '0 auto',
      display: 'grid',
      gridTemplateRows: '60px 1fr 40px',
      background: palette.cm_background.main,
      position: 'relative',
      borderRadius: 12,
      border: `1px solid ${palette.cm_primary.main}`,
      overflow: 'hidden',
      [breakpoints.up(480)]: {
        width: 480,
      },
    },
  }),
  { name: 'App' },
);
