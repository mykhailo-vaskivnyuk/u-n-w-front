import React, { FC } from 'react';
import clsx from 'clsx';
import { RoutesMap } from '@constants/router.constants';
import { ICONS } from '@components/icon/icon';
import { IconButton } from '@components/buttons/icon.button/icon.button';
import { useMenuItems } from './useMenuItems';
import { useStyles } from './header.styles';

export const Header: FC = () => {
  const { root, title, button, homeButton, hidden } = useStyles();
  const { name, openMenu, openNetMenu } = useMenuItems();

  return (
    <div className={root}>
      <IconButton icon={ICONS.menu} onClick={openMenu} className={button} />
      <div className={title}>{name}</div>
      <IconButton icon={ICONS.home} href={RoutesMap.INDEX} className={clsx(button, homeButton)} />
      <IconButton
        icon={ICONS.menu_nets}
        onClick={openNetMenu}
        className={clsx(button, { [hidden]: !openNetMenu })}
      />
    </div>
  );
};
