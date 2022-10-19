import { vars } from '@styles/vars';
import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(({ palette }) => ({
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
  },
  label: {
    lineHeight: vars.lineHeight.dense,
    fontWeight: vars.fontWeight.semiBold,
    color: palette.cm_primary.main,
  },
}));
