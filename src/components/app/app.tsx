import React, { FC } from 'react';
import { HashRouter } from 'react-router-dom';
import { Theme } from '@styles/theme';
import { ErrorBoundary } from '@components/error/error.boundary';
import { Layout } from '@components/layout/layout';
import { Loading } from '@components/loading/loading';
import { ModalSet } from '@components/modal/modal.set';
import { Content } from '@components/content/content';
import { Router } from './router';
import { useApp } from './useApp';

export const App: FC = () => {
  useApp();

  return (
    <ErrorBoundary level="top">
      <Theme>
        <ErrorBoundary level="app">
          <HashRouter>
            <Layout>
              <ModalSet />
              <Loading />
              <Content>
                <Router />
              </Content>
            </Layout>
          </HashRouter>
        </ErrorBoundary>
      </Theme>
    </ErrorBoundary>
  );
};
