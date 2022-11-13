import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, breakpoints, vars }) => ({
    root: {
      width: '100%',
      height: '100%',
      margin: '0 auto',
      display: 'grid',
      gridTemplateRows: '60px 1fr 40px',
      background: palette.bg.main,
      position: 'relative',
      borderRadius: vars.radius.main,
      overflow: 'hidden',
      [breakpoints.maxWidth]: {
        width: vars.width.maxWidth,
      },
      [breakpoints.minHeight]: {
        height: 'calc(100% + 52px)',
      },
    },
  }),
  { name: 'Layout' },
);
