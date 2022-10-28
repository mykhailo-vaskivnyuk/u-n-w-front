import { ICONS } from '@components/icon/icon';

export interface IMenuItem {
  id: number;
  label: string;
  pathname: string;
  icon: ICONS;
}

export interface MenuItemProps extends IMenuItem {
  onClick: () => void;
}
