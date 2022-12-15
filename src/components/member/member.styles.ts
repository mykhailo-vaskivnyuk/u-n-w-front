import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, vars }) => ({
    root: {
      padding: vars.gap.S,
      color: palette.font.first,
      border: `1px solid ${palette.first.main}`,
      borderRadius: vars.radius.S,
      height: '100%',
    },
  }),
  { name: 'Member' },
);
