import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, vars, mixins }) => ({
    root: {
      margin: `0 -${vars.gap.main} 0`,
      display: 'flex',
      gap: vars.gap.S,
      alignItems: 'center',
      padding: vars.gap.S,
      background: palette.add.main,
      borderRadius: vars.gap.main,
      color: palette.font.light,
      fontWeight: vars.fontWeight.semiBold,
    },
    avatar: {
      ...mixins.size(42),
      background: palette.light.main,
      borderRadius: 100,
    },
  }),
  { name: 'MemberTitle' },
);
