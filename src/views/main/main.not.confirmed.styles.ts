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
        width: '90%',
        fontSize: vars.fontSize.M,
        textAlign: 'center',
      },
    },
    button: {
      width: '90%',
      marginTop: vars.gap.XL,
    },
  }),
  { name: 'MainNotConfirmed' },
);
