import '../styles/globals.css';
import type { AppProps } from 'next/app';

const MyApp = function ({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
};
export default MyApp;
