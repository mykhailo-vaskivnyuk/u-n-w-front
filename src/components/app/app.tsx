import React, { FC } from 'react';
import { HashRouter } from 'react-router-dom';
import { Theme } from '@styles/theme';
import { ErrorBoundary } from '@components/error/error.boundary';
import { Layout } from '@components/layout/layout';
import { Loading } from '@components/loading/loading';
import { ModalSet } from '@components/modal/modal.set';
import { Content } from '@components/content/content';
import { useAppState } from './useAppState';
import { Router } from './router';

export const App: FC = () => {
  const state = useAppState();
  return (
    <ErrorBoundary level="top">
      <Theme>
        <ErrorBoundary level="app">
          <HashRouter>
            <Layout>
              <ModalSet />
              <Loading state={state} />
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
