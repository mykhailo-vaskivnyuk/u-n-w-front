import { ICONS } from '@components/icon/icon';

export const MenuTypes = ['notLogedIn', 'notConfirmed', 'logedIn', 'dev', 'insideNet'] as const;

export interface IMenuItem {
  label: string;
  pathname: string;
  icon: ICONS;
  menu: typeof MenuTypes[number][];
}

export interface MenuItemProps extends IMenuItem {
  active: boolean;
  onClick: () => void;
}
