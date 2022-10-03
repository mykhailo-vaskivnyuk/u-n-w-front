import { createUseStyles as makeStyles } from 'react-jss';

export const useStyles = makeStyles(({ palette }) => ({
  '@global': {
    '*': {
      boxSizing: 'border-box',
    },
    ul: {
      margin: 0,
    },
    img: {
      maxWidth: '100%',
    },
  },
  root: {
    width: "100%",
    textAlign: "center",
    background: palette.cm_primary.main,
    position: 'relative',
    overflow: 'hidden',
    '& pre': {
      textAlign: "left",
    }
  },
  gallery: {
    height: 550,
    position: 'relative',
  }
}), { name: "appRoot" });
