import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ mixins }) => ({
    root: {
      height: '100%',
      display: 'grid',
      gridTemplateRows: '50px repeat(7, 1fr)',
      gap: 5,
    },
    menu: {
      height: '100%',
      ...mixins.flexCenter,
      border: '1px dotted #000000',
    },
    member: {
      height: '100%',
      ...mixins.flexCenter,
      border: '1px dotted #000000',
    },
  }),
  { name: 'Members' },
);
