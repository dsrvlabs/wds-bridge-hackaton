import React from 'react';
import dynamic from 'next/dynamic';
import { Divider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import getTheme from 'theme';
import { LayoutProps } from './types';

const Navbar = dynamic(() => {
  return import('@layout/Navbar');
});

const Layout: React.FunctionComponent<LayoutProps> = ({
  children,
  themeToggler,
  themeMode,
  connected,
}) => {
  // ThemeProvider for Navbar
  return (
    <ThemeProvider theme={getTheme(themeMode, themeToggler)}>
      <Navbar connected={connected} />
      <main>
        <Divider />
        {children}
      </main>
    </ThemeProvider>
  );
};

export default Layout;
