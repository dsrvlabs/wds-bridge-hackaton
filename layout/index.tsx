import React from 'react';
import dynamic from 'next/dynamic';
import { Divider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import getTheme from 'theme';
import { LayoutProps } from './types';

const Navbar = dynamic(() => {
  return import('@layout/Navbar');
});

const Layout: React.FunctionComponent<LayoutProps> = ({ children, themeToggler, themeMode }) => {
  // ThemeProvider for Navbar
  return (
    <ThemeProvider theme={getTheme(themeMode, themeToggler)}>
      <Navbar />
      <main>
        <Divider />
        {children}
      </main>
    </ThemeProvider>
  );
};

export default Layout;
