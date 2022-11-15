import React, { FC, memo, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { Icon, ICONS } from '@components/icon/icon';
import { useStyles } from './icon.button.styles';

interface IconButtonProps {
  icon: ICONS;
  href?: string;
  className?: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const IconButton: FC<IconButtonProps> = memo((props) => {
  const { root } = useStyles();
  const { icon, href, className, onClick } = props;

  if (href) {
    return (
      <Link to={href} className={clsx(root, className)}>
        <Icon icon={icon} />
      </Link>
    );
  }

  return (
    <button className={clsx(root, className)} type="button" onClick={onClick}>
      <Icon icon={icon} />
    </button>
  );
});
