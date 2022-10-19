import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, mixins, breakpoints }) => ({
    root: {
      ...mixins.size('100%', 36),
      ...mixins.flexCenter,
      background: palette.cm_primary.main,
      color: palette.cm_background.light,
      // border: `1px solid ${palette.cm_background.dark}`,
      padding: 6,
      // margin: 10,
      borderRadius: 4,
      '&.secondary': {
        background: palette.cm_secondary.main,
      },
    },
  }),
  {
    name: 'Button',
  },
);
