import React, { FC } from 'react';
import { Footer } from '@components/footer/footer';
import { Content } from '@components/content/content';
import { useCssBaseline } from '@styles/hooks/useCssBaseline';
import { useStyles } from './app.styles';
import { Header } from '../header/header';

export const App: FC = () => {
  const { root } = useStyles();
  useCssBaseline();

  return (
    <div className={root}>
      <Header />
      <Content />
      <Footer />
    </div>
  );
};
