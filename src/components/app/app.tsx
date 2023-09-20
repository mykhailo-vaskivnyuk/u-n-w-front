import React, { FC } from 'react';
import { HashRouter } from 'react-router-dom';
import { useApp } from '@hooks/useApp';
import { ErrorBoundary } from '@components/error/error.boundary';
import { Theme } from '@styles/theme';
import { NavigateProvider } from '@contexts/navigate/navigate';
import { Layout } from '@components/layout/layout';
import { ErrorCatch } from '@components/error/error.catch';
import { ModalSet } from '@components/modal/modal.set';
import { Loading } from '@components/loading/loading';
import { Content } from '@components/content/content';
import { Router } from '@router/router';

export const App: FC = () => {
  useApp();
  return (
    <ErrorBoundary level="app">
      <Theme>
        <ErrorBoundary level="router">
          <HashRouter>
            <NavigateProvider>
              <Layout>
                <ModalSet />
                <Loading />
                <ErrorCatch />
                <Content>
                  <Router />
                </Content>
              </Layout>
            </NavigateProvider>
          </HashRouter>
        </ErrorBoundary>
      </Theme>
    </ErrorBoundary>
  );
};
