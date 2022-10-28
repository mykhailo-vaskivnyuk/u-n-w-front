import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, mixins }) => ({
    root: {
      ...mixins.size('100%', 36),
      ...mixins.flexCenter,
      background: palette.bg.first,
      color: palette.font.light,
      padding: 6,
      borderRadius: 4,
      textTransform: 'uppercase',
      cursor: 'pointer',
      '&.secondary': {
        background: palette.bg.second,
      },
      '&:link, &:visited': {
        color: palette.font.light,
      },
    },
  }),
  {
    name: 'Button',
  },
);
