import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import getTheme from 'theme';
import { Account } from '@components/Menu/account';

interface Props2 {
  children: React.ReactNode;
  themeToggler: () => void;
  themeMode: string;
  connected: (accounts: Account[]) => void;
}

interface Props {
  layout: React.FunctionComponent<Props2>;
  component: React.FunctionComponent<{ themeMode: string }>;
  connected: (accounts: Account[]) => void;
}

export const useDarkMode = (): [string, () => void, boolean] => {
  const [themeMode, setTheme] = useState('light');
  const [mountedComponent, setMountedComponent] = useState(false);

  const setMode = (mode: string): void => {
    window.localStorage.setItem('themeMode', mode);
    setTheme(mode);
  };

  const themeToggler = (): void => {
    themeMode === 'light' ? setMode('dark') : setMode('light');
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('themeMode');
    localTheme ? setTheme(localTheme) : setMode('light');
    setMountedComponent(true);
  }, []);

  return [themeMode, themeToggler, mountedComponent];
};

export default function AppLayout({
  component: Component,
  layout: Layout,
  connected: connected,
}: Props): JSX.Element {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [themeMode, themeToggler, mountedComponent] = useDarkMode();

  /* const getTheme2 = (): Theme2 => {
    const theme = themeCreator(themeMode === 'light' ? 'PureLightTheme' : 'DarkSpacesTheme');
    return { ...responsiveFontSizes(createMuiTheme(theme)), layout: { contentWidth: 1236 } }; // 화면 폭 조절
  }; */

  // ThemeProvider for Component
  return (
    <>
      <ThemeProvider theme={getTheme(themeMode, themeToggler)}>
        <CssBaseline />
        <Paper elevation={0}>
          <Layout
            themeMode={themeMode === 'light' ? 'light' : 'dark'}
            themeToggler={themeToggler}
            connected={connected}
          >
            <Component themeMode={themeMode === 'light' ? 'light' : 'dark'} />
          </Layout>
        </Paper>
      </ThemeProvider>
    </>
  );
}
