import React, { FC } from 'react';
import clsx from 'clsx';
import { Icon, ICONS } from '@components/icon/icon';
import { useStyles } from './net.menu.styles';

export interface NetMenuProps {
  className: string;
}

export const NetMenu: FC<NetMenuProps> = (props) => {
  const { root, section } = useStyles();
  const { className } = props;

  const itemsJsx = [
    <Icon key="key1" icon={ICONS.account} />,
    <Icon key="key2" icon={ICONS.login} />,
    <Icon key="key3" icon={ICONS.create} />,
  ];

  return (
    <div className={clsx(root, className)}>
      <ul className={clsx(section)}>{itemsJsx}</ul>
    </div>
  );
};
