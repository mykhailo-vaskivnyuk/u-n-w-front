import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, vars, mixins }) => ({
    root: {
      width: '100%',
      padding: `${vars.gap.S} ${vars.gap.S}`,
      color: palette.font.light,
      background: palette.first.extraLight,
      borderRadius: vars.radius.S,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      fontWeight: vars.fontWeight.semiBold,
      marginLeft: '50%',
      transform: `translateX(calc(-50% - ${vars.gap.S}))`,
    },
    section: {
      ...mixins.flexCenter,
    },
    button: {
      ...mixins.size(28),
      color: 'currentColor',
      marginLeft: `calc(${vars.gap.main} - ${vars.gap.SS} / 2)`,
      borderRadius: 100,
      '&.active': {
        color: palette.font.light,
        background: palette.first.light,
      },
    },
  }),
  { name: 'NetSubmenu' },
);
