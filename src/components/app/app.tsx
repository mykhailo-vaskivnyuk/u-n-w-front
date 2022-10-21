import React, { FC, useEffect } from 'react';
import { useCssBaseline } from '@styles/hooks/useCssBaseline';
import { Header } from '@components/header/header';
import { Content } from '@components/content/content';
import { Footer } from '@components/footer/footer';
import { Modal } from '@components/modal/modal';
import { ClientApp } from '../../api/client.app';
import { useStyles } from './app.styles';

export const App: FC = () => {
  useCssBaseline();
  const { root } = useStyles();

  useEffect(() => {
    const app = new ClientApp('http://localhost:8000/api');
    app.testRequest().catch(() => console.log('testRequestError'));
  }, []);

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
