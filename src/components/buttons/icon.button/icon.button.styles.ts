import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ mixins, vars }) => ({
    root: {
      ...mixins.size(42),
      ...mixins.flexCenter,
      background: 'transparent',
      padding: vars.gap.SS,
      cursor: 'pointer',
    },
  }),
  {
    name: 'IconButton',
  },
);
