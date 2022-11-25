import React, { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import { Header } from '@components/header/header';
import { Footer } from '@components/footer/footer';
import { NetMenu } from '@components/menu/net.menu/net.menu';
import { useUser } from '@hooks/useUser';
import { useStyles } from './layout.styles';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { root, netMenu } = useStyles();
  const user = useUser();
  const showNetMenu = user?.user_state === 'INSIDE_NET' && 'opened';

  return (
    <div className={root}>
      <Header />
      <NetMenu className={clsx(netMenu, showNetMenu)} />
      {children}
      <Footer />
    </div>
  );
};
