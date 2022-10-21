import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'react-jss';
import { defaultTheme } from '@styles/theme';
import { ErrorBoundary } from '@components/error/error.boundary';
import { App } from './components/app/app';

const root = document.getElementById('root');

root &&
  ReactDOM.createRoot(root).render(
    <ErrorBoundary level="top">
      <ThemeProvider theme={defaultTheme}>
        <ErrorBoundary level="app">
          <App />
        </ErrorBoundary>
      </ThemeProvider>
    </ErrorBoundary>,
  );
