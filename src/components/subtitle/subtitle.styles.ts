import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, mixins, vars }) => ({
    root: {
      ...mixins.flexCenter,
      fontSize: vars.fontSize.XL,
      color: palette.font.first,
      margin: `${vars.gap.M} 0`,
      textTransform: 'uppercase',
    },
  }),
  { name: 'Subtitle' },
);
