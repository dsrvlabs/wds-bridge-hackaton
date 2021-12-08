import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import getTheme from 'theme';

interface Props {
  children: React.ReactNode;
}

export const useDarkMode = (): [string, () => void, boolean] => {
  const [themeMode, setTheme] = useState('dark');
  const [mountedComponent, setMountedComponent] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const themeToggler = (): void => {};

  useEffect(() => {
    setMountedComponent(true);
  }, []);

  return [themeMode, themeToggler, mountedComponent];
};

export default function Page({ children }: Props): JSX.Element {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [themeMode, themeToggler, mountedComponent] = useDarkMode();

  return (
    <ThemeProvider theme={getTheme(themeMode, themeToggler)}>
      <CssBaseline />
      <Paper elevation={0}>{children}</Paper>
    </ThemeProvider>
  );
}
