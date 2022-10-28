import React, { FC } from 'react';
import { modalService } from '@services/modal.service';
import { ICONS } from '@components/icon/icon';
import { IconButton } from '@components/buttons/icon.button/icon.button';
import { MENU_ITEMS } from '@constants/constants';
import { Menu } from '@components/menu/menu';
import { useStyles } from './header.styles';

export const Header: FC = () => {
  const { root, title, button } = useStyles();

  return (
    <div className={root}>
      <IconButton
        icon={ICONS.menu}
        onClick={() => modalService.openModal(<Menu items={MENU_ITEMS} />)}
        className={button}
      />
      <div className={title}>НЕ В СПІЛЬНОТІ</div>
    </div>
  );
};
