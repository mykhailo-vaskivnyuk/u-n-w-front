import React, { FC, useCallback, useMemo } from 'react';
import clsx from 'clsx';
import { NetViewEnum } from '@server/types/net.types';
import { MENU_CIRCLE_ITEMS, MENU_TREE_ITEMS } from '@constants/menu.constants';
import { NET_VIEW_NAME } from '@constants/dictionary';
import { app } from '@app/common/client/app';
import { useTree } from '@hooks/useTree';
import { useCircle } from '@hooks/useCircle';
import { getMenuItems } from '@utils/menu.utils';
import { IconButton } from '@components/buttons/icon.button/icon.button';
import { Button } from '@components/buttons/button/button';
import { useStyles } from '../net.submenu.styles';

const NET_VIEW_MENU = {
  tree: MENU_TREE_ITEMS,
  circle: MENU_CIRCLE_ITEMS,
};

export const NetViewMenu: FC<{ netView: NetViewEnum }> = ({ netView }) => {
  const { root, title, section, button } = useStyles();
  const tree = useTree();
  const circle = useCircle();
  const isCircle = netView === 'circle';
  const setCircle = useCallback(() => app.net.setView('circle'), []);
  const setTree = useCallback(() => app.net.setView('tree'), []);

  const itemsJsx = useMemo(() => {
    const items = getMenuItems(NET_VIEW_MENU[netView]);
    if (!items) return;
    return items.map((item) => (
      <li key={item.href}>
        <IconButton className={button} {...item} />
      </li>
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tree, circle]);

  return (
    <div className={root}>
      <div className={title}>
        <Button onClick={setTree} btnType="text" className={clsx({ active: !isCircle })}>
          {NET_VIEW_NAME.tree.toUpperCase()}
        </Button>
        <Button onClick={setCircle} btnType="text" className={clsx({ active: isCircle })}>
          {NET_VIEW_NAME.circle.toUpperCase()}
        </Button>
      </div>
      <ul className={clsx(section)}>{itemsJsx}</ul>
    </div>
  );
};
