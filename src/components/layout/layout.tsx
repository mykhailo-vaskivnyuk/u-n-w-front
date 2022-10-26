import React, { FC, PropsWithChildren } from 'react';
import { Header } from '@components/header/header';
import { Footer } from '@components/footer/footer';
import { useStyles } from './layout.styles';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { root } = useStyles();

  return (
    <div className={root}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};
