import React, { FC, PropsWithChildren } from 'react';
import Jss, { ThemeProvider } from 'react-jss';
import { mixins } from './mixins';
import { breakpoints } from './breakpoints';
import { palette } from './palette';
import { vars } from './vars';
import { useCssBaseline } from './hooks/useCssBaseline';

function createCustomTheme(): Jss.Theme {
  return {
    palette,
    mixins,
    breakpoints,
    vars,
  };
}

const defaultTheme = createCustomTheme();

const CssBaseline: FC = () => {
  useCssBaseline();
  return null;
};

const Theme: FC<PropsWithChildren<{ theme?: Jss.Theme }>> = ({ theme, children }) => (
  <ThemeProvider theme={theme || defaultTheme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);

export { defaultTheme, createCustomTheme, Theme };
