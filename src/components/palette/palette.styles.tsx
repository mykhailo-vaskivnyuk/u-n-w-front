import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ palette, mixins, vars }) => ({
    root: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gridGap: vars.gap.S,
      margin: vars.gap.S,
    },
    color: {
      display: 'grid',
      gridGap: vars.gap.SS,
      border: `1px solid ${palette.dark.main}`,
      '& div': {
        height: 50,
        ...mixins.flexCenter,
      },
    },
  }),
  { name: 'Palette' },
);
