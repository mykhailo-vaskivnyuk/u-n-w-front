import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, vars, mixins }) => ({
    root: {
      height: 60,
      display: 'flex',
      alignItems: 'center',
      gap: vars.gap.S,
      padding: vars.gap.S,
      border: `2px solid ${palette.add.main}`,
      borderRadius: vars.gap.main,
      background: palette.light.main,
      color: palette.font.add,
      fontWeight: vars.fontWeight.semiBold,
    },
    avatar: {
      ...mixins.size(42),
      border: `1px solid ${palette.add.main}`,
      borderRadius: 100,
    },
  }),
  { name: 'MemberTitle' },
);
