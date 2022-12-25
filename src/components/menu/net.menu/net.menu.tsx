import React, { FC } from 'react';
import clsx from 'clsx';
import { useNet } from '@hooks/useNet';
import { useNetMenuItems } from '@hooks/useNetMenuItems';
import { IconButton } from '@components/buttons/icon.button/icon.button';
import { useStyles } from './net.menu.styles';

export const NetMenu: FC = () => {
  const { root, section, button } = useStyles();
  const [opened] = useNet();
  const items = useNetMenuItems() || [];

  const itemsJsx = items.map((item) => (
    <li>
      <IconButton key={item.href} className={button} {...item} />
    </li>
  ));

  return (
    <div className={clsx(root, { opened })}>
      <ul className={clsx(section)}>{itemsJsx}</ul>
    </div>
  );
};
