import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, mixins }) => ({
    root: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gridGap: 5,
      margin: 5,
    },
    color: {
      display: 'grid',
      gridGap: 5,
      border: `1px solid ${palette.dark.main}`,
      '& div': {
        height: 50,
        ...mixins.flexCenter,
        fontSize: 20,
      },
    },
  }),
  { name: 'Palette' },
);
