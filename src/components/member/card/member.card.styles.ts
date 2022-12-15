import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, vars, mixins }) => ({
    root: {
      display: 'flex',
      gridTemplateColumns: '50px 1fr',
      alignItems: 'center',
      padding: vars.gap.S,
      color: palette.font.first,
      border: `1px solid ${palette.first.main}`,
      borderRadius: vars.radius.S,
      cursor: 'pointer',
      height: '100%',
      gridGap: vars.gap.S,
    },
    avatar: {
      ...mixins.size(42),
      borderRadius: 100,
      border: `2px solid ${palette.first.main}`,
      background: palette.first.extraLight,
    },
  }),
  { name: 'MemberCard' },
);
