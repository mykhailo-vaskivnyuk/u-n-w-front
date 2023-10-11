import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, vars }) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      '& + &': {
        marginTop: vars.gap.main,
      },
    },
    input: {
      color: palette.font.second,
      padding: vars.gap.SS,
      paddingLeft: vars.gap.S,
      paddingRight: vars.gap.S,
      borderRadius: vars.radius.SS,
      border: `1px solid ${palette.first.main}`,
      fontWeight: vars.fontWeight.semiBold,
      letterSpacing: vars.letterGap.M,
      '&:focus:not($textarea)': {
        borderColor: palette.first.main,
        borderWidth: 2,
        paddingTop: `calc(${vars.gap.SS} - 1px)`,
        paddingBottom: `calc(${vars.gap.SS} - 1px)`,
      },
      '&:-webkit-autofill': {
        '-webkit-text-fill-color': `${palette.second.main} !important`,
        '-webkit-box-shadow': '0 0 0 30px #ffffff inset !important',
      },
    },
    textarea: {
      height: '200px',
      color: palette.font.second,
      border: `1px solid ${palette.first.main}`,
    },
    label: {
      lineHeight: vars.lineHeight.dense,
      fontWeight: vars.fontWeight.semiBold,
      color: palette.font.first,
      fontSize: vars.fontSize.S,
    },
    error: {
      padding: `0 ${vars.gap.S}`,
      marginTop: vars.gap.SS,
      borderRadius: vars.radius.SS,
      color: palette.font.light,
      background: palette.dark.dark,
      letterSpacing: vars.letterGap.L,
      fontSize: vars.fontSize.S,
    },
  }),
  { name: 'Input' },
);
