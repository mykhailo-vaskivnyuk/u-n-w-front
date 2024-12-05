import { createUseStyles } from 'react-jss';

const BORDER = 2;
const ICON = 24;

export const useStyles = createUseStyles(
  ({ palette, vars, mixins }) => {
    const height = (Number.parseInt(vars.gap.S, 10) + BORDER) * 2 + ICON;
    return {
      root: {
        height,
        transform: `translateY(-${height}px)`,
        transition: `all ${vars.transition.normal} ease-in`,
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
        color: palette.font.first,
        background: palette.light.main,
        border: `${BORDER}px solid ${palette.first.main}`,
        borderRadius: `0 0 ${vars.radius.main} ${vars.radius.main} `,
        padding: `0 calc(${vars.gap.main} - ${BORDER}px)`,
        '&.opened': {
          transform: 'translateY(0)',
        },
      },
      section: {
        ...mixins.flexCenter,
      },
      button: {
        ...mixins.size(28),
        marginLeft: `calc(${vars.gap.main} - ${vars.gap.SS} / 2)`,
        borderRadius: 100,
        '&.active': {
          color: palette.font.light,
          background: palette.first.light,
        },
      },
    };
  },
  { name: 'NetMenu' },
);
