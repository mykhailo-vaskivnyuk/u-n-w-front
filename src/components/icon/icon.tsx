import React, { FC, SyntheticEvent, memo, lazy, Suspense, PropsWithChildren } from 'react';
import clsx from 'clsx';
import { useStyles } from './icon.styles';

interface IconProps {
  icon: ICONS;
  raw?: boolean;
  className?: string;
  onClick?: ((e: SyntheticEvent) => void) | (() => void);
}

const getAsyncIconComponent = (icon: ICONS) =>
  lazy(() => import(/* webpackChunkName: "icon" */ `../../../public/icons/${icon}.svg`));

export const Icon: FC<PropsWithChildren<IconProps>> = memo(
  ({ icon, raw, className, children, ...restProps }) => {
    const classes = useStyles();
    if (!icon) {
      return null;
    }

    const AsyncIcon = getAsyncIconComponent(icon);

    return (
      <i {...restProps} className={clsx('icon', classes.root, icon, className, { raw })}>
        <Suspense fallback={null}>
          <AsyncIcon />
        </Suspense>
      </i>
    );
  },
);
Icon.displayName = 'Icon';

export enum ICONS {
  about = 'about',
  account = 'account',
  arrowDown = 'arrow.down',
  arrowLeft = 'arrow.left',
  arrowRight = 'arrow.right',
  arrowUp = 'arrow.up',
  board = 'board',
  create = 'create',
  cross = 'cross',
  dev = 'dev',
  home = 'home',
  login = 'login',
  logout = 'logout',
  menu = 'menu',
  message = 'message',
  net = 'net',
  notification = 'notification',
  post = 'post',
  remove = 'remove',
  spinner = 'spinner',
  telegram = 'telegram',
}
