import React, { FC, useEffect } from 'react';
import { Footer } from '@components/footer/footer';
import { Content } from '@components/content/content';
import { useCssBaseline } from '@styles/hooks/useCssBaseline';
import { Loading } from '@components/loading/loading';
import { ClientApp } from '../../api/client.app';
import { useStyles } from './app.styles';
import { Header } from '../header/header';

export const App: FC = () => {
  const { root } = useStyles();
  useCssBaseline();

  useEffect(() => {
    const app = new ClientApp('http://localhost:8000/api');
    app.testRequest().catch(() => console.log('testRequestError'));
  });

  return (
    <div className={root}>
      {/* <Loading /> */}
      <Header />
      <Content />
      <Footer />
    </div>
  );
};
