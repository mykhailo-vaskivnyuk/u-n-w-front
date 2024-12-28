import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ vars, palette }) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'strech',
      paddingBottom: vars.gap.L,
      color: palette.add.main,
      fontSize: vars.fontSize.M - 4,
      '& p': {
        marginTop: vars.gap.L,
        width: '100%',
        '&:first-child': {
          marginTop: 0,
        },
      },
      '& ul': {
        paddingLeft: vars.gap.L,
      },
      '& li': {
        listStyleType: 'decimal',
      },
    },
  }),
  { name: 'Rules' },
);
