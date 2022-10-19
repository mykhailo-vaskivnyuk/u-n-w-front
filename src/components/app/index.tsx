import React, { FC, useEffect } from 'react';
import { useMediaQuery } from '@styles/hooks/useMediaQuery';
import { useRipples } from '@hooks/useRipple';
import { ClientApp } from 'api.client/client.app';
import { Footer } from '@components/footer/footer';
import { Main } from '@components/main/main';
import { useCssBaseline } from '@styles/hooks/useCssBaseline';
import { useStyles } from './index.styles';
import { Header } from '../header/header';

export const App: FC = () => {
  const { root, gallery } = useStyles();
  const [ripples, showRipple] = useRipples();
  const match = useMediaQuery('(min-width: 500px)') && 'match';
  useCssBaseline();
  useEffect(() => {
    // throw new Error('TEST ERROR');
    const baseUrl = 'http://localhost:8000'; // 'https://merega.herokuapp.com/api';
    const app = new ClientApp(baseUrl);
    app.testRequest();
  }, []);

  return (
    <div className={root} onClick={showRipple} aria-hidden="true">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};
