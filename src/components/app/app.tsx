import React, { FC, useEffect } from 'react';
import { Footer } from '@components/footer/footer';
import { Content } from '@components/content/content';
import { useCssBaseline } from '@styles/hooks/useCssBaseline';
import { ClientApp } from '../../api.client/client.app';
import { useStyles } from './app.styles';
import { Header } from '../header/header';

export const App: FC = () => {
  const { root } = useStyles();
  useCssBaseline();

  useEffect(() => {
    const app = new ClientApp('http://localhost:8000/api');
    app.testRequest();
  });

  return (
    <div className={root}>
      <Header />
      <Content />
      <Footer />
    </div>
  );
};
