import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, mixins, breakpoints }) => ({
    root: {
      ...mixins.size(42),
      ...mixins.flexCenter,
      background: 'transparent',
      padding: 6,
    },
  }),
  {
    name: 'IconButton',
  },
);
