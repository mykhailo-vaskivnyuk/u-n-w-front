import React, { FC, memo, PropsWithChildren } from 'react';
import clsx from 'clsx';
import { useStyles } from './button.styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btnType: 'primary' | 'secondary';
}

export const Button: FC<PropsWithChildren<ButtonProps>> = memo((props) => {
  const { root } = useStyles();
  const { type = 'button', btnType, className, ...rest } = props;

  return <button {...rest} type={type} className={clsx(root, btnType, className)} />;
});
