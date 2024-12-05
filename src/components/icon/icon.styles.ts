import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  {
    root: {
      width: 24,
      height: 24,
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexShrink: 0,

      '&:not(.raw)': {
        '& svg': {
          '& path, & polygon, & rect, & circle': {
            fill: 'currentColor',
          },
        },
      },

      '& svg': {
        display: 'block',
        width: '100%',
        height: '100%',
      },
    },
  },
  {
    name: 'Icon',
  },
);
