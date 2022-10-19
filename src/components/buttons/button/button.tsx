import React, { FC, memo, MouseEvent, PropsWithChildren } from 'react';
import { Icon, ICONS } from '@components/icon/icon';
import clsx from 'clsx';
import { useStyles } from './button.styles';

interface ButtonProps {
  icon?: ICONS;
  className?: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  type: 'primary' | 'secondary';
}

export const Button: FC<PropsWithChildren<ButtonProps>> = memo((props) => {
  const { root } = useStyles();
  const { icon, className, onClick, type, children } = props;

  return (
    <button className={clsx(root, type, className)} type="button" onClick={onClick}>
      {/* <Icon icon={icon} /> */}
      {children}
    </button>
  );
});
