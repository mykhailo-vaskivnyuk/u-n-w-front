import React, { FC, memo, MouseEvent } from 'react';
import clsx from 'clsx';
import { Icon, ICONS } from '@components/icon/icon';
import { useStyles } from './icon.button.styles';

interface IconButtonProps {
  icon: ICONS;
  className?: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const IconButton: FC<IconButtonProps> = memo((props) => {
  const { root } = useStyles();
  const { icon, className, onClick } = props;

  return (
    <button className={clsx(root, className)} type="button" onClick={onClick}>
      <Icon icon={icon} />
    </button>
  );
});
