import React, { FC } from 'react';
import { HashRouter } from 'react-router-dom';
import { useApp } from '@hooks/useApp';
import { ErrorBoundary } from '@components/error/error.boundary';
import { Theme } from '@styles/theme';
import { Layout } from '@components/layout/layout';
import { ErrorCatch } from '@components/error/error.catch';
import { ModalSet } from '@components/modal/modal.set';
import { Loading } from '@components/loading/loading';
import { Content } from '@components/content/content';
import { Router } from '@router/router';

export const App: FC = () => {
  useApp();
  return (
    <ErrorBoundary level="top">
      <Theme>
        <ErrorBoundary level="app">
          <HashRouter>
            <Layout>
              <ErrorCatch />
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
