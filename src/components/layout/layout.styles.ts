import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, breakpoints, vars }) => ({
    root: {
      width: '100%',
      height: '100%',
      margin: '0 auto',
      display: 'grid',
      gridTemplateRows: '60px auto 1fr 40px',
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
    netMenu: {
      transform: 'translateY(-44px)',
      transition: `all ${vars.transition.normal} ease-in`,
      display: 'flex',
      justifyContent: 'end',
      alignItems: 'center',
      border: `2px solid ${palette.first.main}`,
      borderRadius: `0 0 ${vars.radius.main} ${vars.radius.main} `,
      padding: `${vars.gap.S} calc(${vars.gap.main} - 2px)`,
      '&.opened': {
        transform: 'translateY(0)',
      },
    },
  }),
  { name: 'Layout' },
);
