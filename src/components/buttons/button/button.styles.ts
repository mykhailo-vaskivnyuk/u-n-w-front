import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, mixins }) => ({
    root: {
      ...mixins.size('100%', 36),
      ...mixins.flexCenter,
      background: palette.cm_primary.main,
      color: palette.cm_background.light,
      padding: 6,
      borderRadius: 4,
      textTransform: 'uppercase',
      cursor: 'pointer',
      '&.secondary': {
        background: palette.cm_secondary.main,
      },
      '&:link, &:visited': {
        color: palette.cm_background.light,
      },
    },
  }),
  {
    name: 'Button',
  },
);
