import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ mixins, palette, vars }) => ({
    root: {
      width: '100%',
      ...mixins.flexCenter,
      padding: `${vars.gap.S} ${vars.gap.S}`,
      color: palette.font.light,
      background: palette.first.extraLight,
      borderRadius: vars.radius.S,
      fontWeight: vars.fontWeight.semiBold,
      textTransform: 'uppercase',
    },
  }),
  { name: 'ChatTitle' },
);
