import React, { FC, useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import { Theme } from '@styles/theme';
import { ErrorBoundary } from '@components/error/error.boundary';
import { Layout } from '@components/layout/layout';
import { ClientApp } from '@api/client.app';

export const App: FC = () => {
  useEffect(() => {
    const app = new ClientApp('http://localhost:8000/api');
    app.testRequest().catch(() => console.log('testRequestError'));
  }, []);

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
