import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, vars }) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      '& + &': {
        marginTop: 10,
      },
    },
    input: {
      color: palette.font.second,
      padding: 5,
      borderRadius: 4,
      border: `1px solid ${palette.dark.main}`,
      fontWeight: vars.fontWeight.semiBold,
      letterSpacing: 0.5,
      '&:focus': {
        borderColor: palette.first.main,
        borderWidth: 2,
        padding: 4,
      },
      '&:-webkit-autofill': {
        '-webkit-text-fill-color': `${palette.second.main} !important`,
        '-webkit-box-shadow': '0 0 0 30px #ffffff inset !important',
      },
    },
    label: {
      lineHeight: vars.lineHeight.dense,
      fontWeight: vars.fontWeight.semiBold,
      color: palette.font.first,
      fontSize: vars.fontSize.S,
    },
    error: {
      padding: '0 5px',
      marginTop: 5,
      borderRadius: 4,
      color: palette.font.light,
      background: palette.bg.extraDark,
      letterSpacing: 0.5,
      fontSize: vars.fontSize.S,
    },
  }),
  { name: 'Input' },
);
