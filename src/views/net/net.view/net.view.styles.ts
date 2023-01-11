import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ vars, palette }) => ({
    root: {
      height: '100%',
      display: 'grid',
      gridTemplateRows: 'repeat(8, minmax(60px, 1fr))',
      alignItems: 'center',
      gap: vars.gap.SS,
    },
    viewTitle: {
      padding: `0 ${vars.gap.S}`,
      color: palette.font.light,
      background: palette.first.extraLight,
      borderRadius: vars.radius.SS,
      justifySelf: 'center',
      fontWeight: vars.fontWeight.semiBold,
    },
  }),
  { name: 'NetView' },
);
