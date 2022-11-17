import { UserStateKeys } from '@api/constants';
import { ICONS } from '@components/icon/icon';

export interface IMenuItem {
  label: string;
  pathname: string;
  icon: ICONS;
  allowForUser: UserStateKeys;
}

export interface MenuItemProps extends IMenuItem {
  active: boolean;
  onClick: () => void;
}
