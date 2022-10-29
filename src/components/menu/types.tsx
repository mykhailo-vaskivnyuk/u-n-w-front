import { ICONS } from '@components/icon/icon';

export interface IMenuItem {
  label: string;
  pathname: string;
  icon: ICONS;
}

export interface MenuItemProps extends IMenuItem {
  onClick: () => void;
}
