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
  arrowDown = 'arrow-down',
  arrowLeft = 'arrow-left',
  arrowRight = 'arrow-right',
  arrowUp = 'arrow-up',
  calendar = 'calendar',
  confirm = 'confirm',
  cross = 'cross',
  done = 'done',
  earth = 'earth',
  home = 'home',
  info = 'info',
  logout = 'logout',
  menu = 'menu',
  printer = 'printer',
  scale = 'scale',
  search = 'search',
  shortArrowDown = 'short-arrow-down',
  shortArrowLeft = 'short-arrow-left',
  shortArrowRight = 'short-arrow-right',
  shortArrowUp = 'short-arrow-up',
  signin = 'signin',
  spinner = 'spinner',
  trash = 'trash',
  user = 'user',
  userContour = 'user-contour',
  warning = 'warning',
}
