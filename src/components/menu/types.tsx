import { UserStatusKeys } from '@api/api/types/types';
import { ICONS } from '@components/icon/icon';

export interface IMenuItem {
  label: string;
  href: string;
  icon: ICONS;
  allowForUser: UserStatusKeys | UserStatusKeys[];
}

export interface MenuItemProps extends IMenuItem {
  onClick: () => void;
}
