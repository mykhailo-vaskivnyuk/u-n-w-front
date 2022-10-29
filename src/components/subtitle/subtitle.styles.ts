import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, mixins, vars }) => ({
    root: {
      ...mixins.flexCenter,
      fontWeight: vars.fontWeight.semiBold,
      fontSize: vars.fontSize.XL,
      color: palette.font.second,
      margin: '20px 0',
    },
  }),
  { name: 'Subtitle' },
);
