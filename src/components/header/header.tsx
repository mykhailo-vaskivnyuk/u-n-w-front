import React, { FC, useCallback } from 'react';
import { modalService } from '@services/modal.service';
import { ICONS } from '@components/icon/icon';
import { IconButton } from '@components/buttons/icon.button/icon.button';
import { menuNotLogin, menuLogin } from '@constants/constants';
import { useUser } from '@hooks/useUser';
import { useStyles } from './header.styles';

export const Header: FC = () => {
  const { root, title, button } = useStyles();
  const user = useUser();
  const menu = user ? menuLogin : menuNotLogin;
  const openMenu = useCallback(() => modalService.openMenu(menu), [menu]);

  return (
    <div className={root}>
      <IconButton icon={ICONS.menu} onClick={openMenu} className={button} />
      <div className={title}>НЕ В СПІЛЬНОТІ</div>
    </div>
  );
};
