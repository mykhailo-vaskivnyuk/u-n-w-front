import React, { FC, PropsWithChildren } from 'react';
import { Header } from '@components/header/header';
import { Footer } from '@components/footer/footer';
import { NetMenu } from '@components/menu/net.menu/net.menu';
import { useStyles } from './layout.styles';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { root } = useStyles();

  return (
    <div className={root}>
      <Header />
      <NetMenu />
      {children}
      <Footer />
    </div>
  );
};
