import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(({ mixins }) => ({
  root: {
    height: '100%',
    ...mixins.flexCenter,
    // border: '1px dotted #000000',
    // padding: '0 20px',
    overflow: 'auto',
  },
}));
