import { createUseStyles } from 'react-jss';
import { MEMBER_STATUS_ENUM } from '@client/constants';

export const useStyles = createUseStyles(
  ({ palette, vars, mixins }) => ({
    root: {
      display: 'grid',
      gridTemplate: `
        "avatar name status"
        "avatar name vote"
      `,
      gridTemplateColumns: '50px 1fr 80px',
      gridTemplateRows: '1fr 1fr',
      alignItems: 'center',
      padding: vars.gap.S,
      color: palette.font.add,
      border: `1px solid ${palette.add.main}`,
      borderRadius: vars.radius.S,
      background: palette.light.main,
      cursor: 'pointer',
      height: '100%',
      gridGap: vars.gap.S,
    },
    avatar: {
      gridArea: 'avatar',
      ...mixins.size(42),
      border: `1px solid ${palette.add.main}`,
      borderRadius: 100,
    },
    name: {
      gridArea: 'name',
      fontWeight: vars.fontWeight.semiBold,
    },
    [MEMBER_STATUS_ENUM.ACTIVE]: {},
    [MEMBER_STATUS_ENUM.CONNECTED]: {},
    [MEMBER_STATUS_ENUM.INVITED]: {},
    [MEMBER_STATUS_ENUM.FREE]: {
      '& $avatar': {
        display: 'none',
      },
      '& $name': {
        display: 'none',
      },
    },
    [MEMBER_STATUS_ENUM.EMPTY]: {
      '& $avatar': {
        display: 'none',
      },
      '& $name': {
        display: 'none',
      },
    },
    [MEMBER_STATUS_ENUM.UNAVAILABLE]: {
      opacity: 0,
    },
  }),
  { name: 'MemberCard' },
);
