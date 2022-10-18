import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'react-jss';
import { defaultTheme } from '@styles/theme';
import { ErrorBoundary } from '@components/error/error.boundary';
import { App } from './components/app';

ReactDOM.render(
  <ErrorBoundary level="top">
    <ThemeProvider theme={defaultTheme}>
      <ErrorBoundary level="app">
        <App />
      </ErrorBoundary>
    </ThemeProvider>
  </ErrorBoundary>,
  document.getElementById('root'),
);
