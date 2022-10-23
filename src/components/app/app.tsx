import React, { FC } from 'react';
import { HashRouter } from 'react-router-dom';
import { Theme } from '@styles/theme';
import { ErrorBoundary } from '@components/error/error.boundary';
import { Layout } from '@components/layout/layout';

export const App: FC = () => {
  return (
    <ErrorBoundary level="top">
      <Theme>
        <ErrorBoundary level="app">
          <HashRouter>
            <Layout />
          </HashRouter>
        </ErrorBoundary>
      </Theme>
    </ErrorBoundary>
  );
};
