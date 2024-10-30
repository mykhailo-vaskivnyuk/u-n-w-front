import React, { FC } from 'react';
import { RoutesMap } from '@constants/router.constants';
import clsx from 'clsx';
import { useMenuItems } from '@hooks/useMenuItems';
import { IconButton } from '@components/buttons/icon.button/icon.button';
import { Button } from '@components/buttons/button/button';
import { useStyles } from './header.styles';

export const Header: FC = () => {
  const { root, titleButton, button, icon } = useStyles();
  const { name, href, eventsCount, openMainMenu, openNetMenu, showBackButton } = useMenuItems();

  return (
    <div className={root}>
      {openMainMenu && <IconButton icon="menu" onClick={openMainMenu} className={button} />}
      {!openMainMenu && <IconButton icon="home" href={RoutesMap.ROOT} className={button} />}
      <Button href={href} btnType="text" className={titleButton}>
        {name}
      </Button>
      {showBackButton && (
        <IconButton icon="arrowLeft" href={href} className={clsx(button, 'back')} />
      )}
      {openNetMenu && (
        <IconButton
          icon="net"
          onClick={openNetMenu}
          className={button}
          classNameIcon={eventsCount ? icon : undefined}
        />
      )}
    </div>
  );
};
