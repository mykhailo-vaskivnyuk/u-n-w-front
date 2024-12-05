import React, { FC, useMemo } from 'react';
import clsx from 'clsx';
import { MENU_INSIDE_NET_ITEMS } from '@constants/menu.constants';
import { getMenuItems } from '@utils/menu.utils';
import { useNet } from '@hooks/useNet';
import { IconButton } from '@components/buttons/icon.button/icon.button';
import { useStyles } from './net.menu.styles';

export const NetMenu: FC = () => {
  const { root, section, button } = useStyles();
  const [net] = useNet();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const items = useMemo(() => getMenuItems(MENU_INSIDE_NET_ITEMS), [net]);

  const itemsJsx =
    items &&
    items.map((item) => (
      <li key={item.href}>
        <IconButton className={button} {...item} />
      </li>
    ));

  return (
    <div className={clsx(root, { opened: items })}>
      <ul className={clsx(section)}>{itemsJsx}</ul>
    </div>
  );
};
