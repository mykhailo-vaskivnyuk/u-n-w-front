import { UserStatusKeys } from '@server/types/types';
import { ICONS } from '@components/icon/icon';

export interface IMenuItem {
  label: string;
  href: string;
  end?: boolean;
  icon: ICONS;
  allowForUser: UserStatusKeys | UserStatusKeys[];
  forTg?: boolean; // default: true
}

export interface MenuItemProps extends IMenuItem {
  onClick: () => void;
}
