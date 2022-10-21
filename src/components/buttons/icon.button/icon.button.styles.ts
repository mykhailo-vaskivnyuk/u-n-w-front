import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ mixins }) => ({
    root: {
      ...mixins.size(42),
      ...mixins.flexCenter,
      background: 'transparent',
      padding: 6,
      cursor: 'pointer',
    },
  }),
  {
    name: 'IconButton',
  },
);
