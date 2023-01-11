import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, vars, mixins }) => ({
    root: {
      width: '100%',
      padding: `${vars.gap.S} ${vars.gap.S}`,
      color: palette.font.light,
      background: palette.first.extraLight,
      borderRadius: vars.radius.S,
      justifySelf: 'center',
      ...mixins.flexCenter,
    },
    viewTitle: {
      fontWeight: vars.fontWeight.semiBold,
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
  }),
  { name: 'NetViewMenu' },
);
