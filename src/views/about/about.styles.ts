import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ vars, palette }) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingBottom: vars.gap.XL,
      '& p': {
        color: palette.first.main,
        marginTop: vars.gap.L,
        width: '100%',
        fontSize: vars.fontSize.M,
      },
      '& ul': {
        listStyleType: 'disc',
        paddingLeft: vars.gap.L,
        color: palette.first.main,
        fontSize: vars.fontSize.M,
      },
      '& li': {
        listStyleType: 'disc',
      },
    },
    title: {
      fontSize: vars.fontSize.XXL,
      fontWeight: vars.fontWeight.bold,
      color: palette.font.second,
      '& + p': {
        marginTop: vars.gap.XL,
      },
    },
    button: {
      width: '50%',
      marginTop: vars.gap.XL,
    },
  }),
  { name: 'About' },
);
