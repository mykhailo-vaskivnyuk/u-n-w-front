import { UserStateKeys } from '@api/constants';
import { ICONS } from '@components/icon/icon';

export interface IMenuItem {
  label: string;
  href: string;
  icon: ICONS;
  allowForUser: UserStateKeys | UserStateKeys[];
}

export interface MenuItemProps extends IMenuItem {
  onClick: () => void;
}
