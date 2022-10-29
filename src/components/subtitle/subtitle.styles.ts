import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, mixins, vars }) => ({
    root: {
      ...mixins.flexCenter,
      fontWeight: vars.fontWeight.semiBold,
      fontSize: vars.fontSize.XL,
      color: palette.font.second,
      margin: `${vars.gap.M} 0`,
    },
  }),
  { name: 'Subtitle' },
);
