import React, { FC, memo, MouseEvent, PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { Icon, ICONS } from '@components/icon/icon';
import { useStyles } from './icon.button.styles';

interface IconButtonProps {
  icon: ICONS;
  href?: string;
  iconPosition?: 'left' | 'right';
  className?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const IconButton: FC<PropsWithChildren<IconButtonProps>> = memo((props) => {
  const { root, withChildren } = useStyles();
  const { icon, href, iconPosition, className, onClick, children } = props;

  if (href) {
    return (
      <Link to={href} className={clsx(root, { [withChildren]: children }, className)}>
        {iconPosition === 'right' && children}
        <Icon icon={icon} />
        {iconPosition === 'left' && children}
      </Link>
    );
  }

  return (
    <button
      className={clsx(root, { [withChildren]: children }, className)}
      type="button"
      onClick={onClick}
    >
      {iconPosition === 'right' && children}
      <Icon icon={icon} />
      {iconPosition === 'left' && children}
    </button>
  );
});
