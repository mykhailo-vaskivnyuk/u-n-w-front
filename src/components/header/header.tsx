import React, { FC } from 'react';
import { RoutesMap } from '@constants/router.constants';
import { ICONS } from '@components/icon/icon';
import { IconButton } from '@components/buttons/icon.button/icon.button';
import { Button } from '@components/buttons/button/button';
import { useMenuItems } from '../../hooks/useMenuItems';
import { useStyles } from './header.styles';

export const Header: FC = () => {
  const { root, titleButton, button, icon } = useStyles();
  const { name, href, eventsCount, openMainMenu, openNetMenu } = useMenuItems();

  return (
    <div className={root}>
      {openMainMenu && <IconButton icon={ICONS.menu} onClick={openMainMenu} className={button} />}
      {!openMainMenu && <IconButton icon={ICONS.home} href={RoutesMap.ROOT} className={button} />}
      <Button href={href} btnType="text" className={titleButton}>
        {name}
      </Button>
      {openNetMenu && (
        <IconButton
          icon={ICONS.net}
          onClick={openNetMenu}
          className={button}
          classNameIcon={eventsCount ? icon : undefined}
        />
      )}
    </div>
  );
};
