import React, { FC } from 'react';
import { Header } from '@components/header/header';
import { Content } from '@components/content/content';
import { Footer } from '@components/footer/footer';
import { Modal } from '@components/modal/modal';
import { useStyles } from './layout.styles';

export const Layout: FC = () => {
  const { root } = useStyles();

  return (
    <div className={root}>
      {/* <Loading /> */}
      <Header />
      <Content />
      <Footer />
      <Modal />
    </div>
  );
};
