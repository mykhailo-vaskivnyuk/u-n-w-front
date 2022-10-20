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
      color: palette.cm_secondary.main,
      padding: 5,
      borderRadius: 4,
      border: `1px solid ${palette.cm_background.dark}`,
      fontSize: vars.fontSize.medium,
      fontWeight: vars.fontWeight.bold,
      '&:focus': {
        borderColor: palette.cm_primary.main,
        borderWidth: 2,
        padding: 4,
      },
      '&:-webkit-autofill': {
        '-webkit-text-fill-color': `${palette.cm_secondary.main} !important`,
        '-webkit-box-shadow': '0 0 0 30px #ffffff inset !important',
      },
    },
    label: {
      lineHeight: vars.lineHeight.dense,
      fontWeight: vars.fontWeight.semiBold,
      color: palette.cm_primary.main,
    },
    error: {
      padding: '0 5px',
      marginTop: 5,
      borderRadius: 4,
      color: palette.cm_background.light,
      background: `${palette.cm_secondary.main}aa`,
    },
  }),
  { name: 'Input' },
);
