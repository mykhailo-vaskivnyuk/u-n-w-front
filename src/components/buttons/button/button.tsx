import React, { FC, memo, PropsWithChildren, ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useStyles } from './button.styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  btnType: 'primary' | 'secondary' | 'text';
  href?: string;
}

export const Button: FC<PropsWithChildren<ButtonProps>> = memo((props) => {
  const { root } = useStyles();
  const { type = 'button', btnType, href, className, ...rest } = props;

  if (href) {
    return (
      <Link to={href} className={clsx(root, btnType, className)}>
        {rest.children}
      </Link>
    );
  }

  return <button {...rest} type={type} className={clsx(root, btnType, className)} />;
});
