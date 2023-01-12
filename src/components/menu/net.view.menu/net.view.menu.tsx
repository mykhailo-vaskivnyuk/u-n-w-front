import React, { FC, useMemo } from 'react';
import clsx from 'clsx';
import { NetViewKeys } from '@api/api/types/net.types';
import { MENU_CIRCLE_ITEMS, MENU_TREE_ITEMS } from '@constants/menu.constants';
import { useTree } from '@hooks/useTree';
import { useCircle } from '@hooks/useCircle';
import { getMenuItems } from '@utils/utils';
import { IconButton } from '@components/buttons/icon.button/icon.button';
import { useStyles } from './net.view.menu.styles';

const NET_VIEW_MENU = {
  tree: MENU_TREE_ITEMS,
  circle: MENU_CIRCLE_ITEMS,
};

export const NetViewMenu: FC<{ netView: NetViewKeys }> = ({ netView }) => {
  const { root, viewTitle, section, button } = useStyles();
  const tree = useTree();
  const circle = useCircle();

  const items = useMemo(() => getMenuItems(NET_VIEW_MENU[netView]), [tree, circle]);

  const itemsJsx =
    items &&
    items.map((item) => (
      <li key={item.href}>
        <IconButton className={button} {...item} />
      </li>
    ));

  return (
    <div className={clsx(root, { opened: items })}>
      <div className={viewTitle}>{netView.toUpperCase()} VIEW</div>
      <ul className={clsx(section)}>{itemsJsx}</ul>
    </div>
  );
};
