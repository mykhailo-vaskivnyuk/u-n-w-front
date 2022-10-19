import React, { FC, memo, MouseEvent, PropsWithChildren } from 'react';
import clsx from 'clsx';
import { useStyles } from './button.styles';

interface ButtonProps {
  type: 'primary' | 'secondary';
  className?: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const Button: FC<PropsWithChildren<ButtonProps>> = memo((props) => {
  const { root } = useStyles();
  const { type, className, onClick, children } = props;

  return (
    <button className={clsx(root, type, className)} type="button" onClick={onClick}>
      {children}
    </button>
  );
});
