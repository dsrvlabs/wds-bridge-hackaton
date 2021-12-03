/* eslint-disable @next/next/no-sync-scripts */
import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { CacheProvider } from '@emotion/react';
import createCache, { EmotionCache } from '@emotion/cache';
import createEmotionServer from '@emotion/server/create-instance';
import { DocumentInitialProps, RenderPageResult } from 'next/dist/shared/lib/utils';

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#ffffff" />
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <script
            src="https://cdn.ethers.io/lib/ethers-5.0.umd.min.js"
            type="text/javascript"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

const getCache = (): EmotionCache => {
  const cache = createCache({ key: 'css', prepend: true });
  cache.compat = true;
  return cache;
};

MyDocument.getInitialProps = async (ctx): Promise<DocumentInitialProps> => {
  const originalRenderPage = ctx.renderPage;

  const cache = getCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = (): RenderPageResult | Promise<RenderPageResult> => {
    return originalRenderPage({
      enhanceComponent: (Component) => {
        return (props): JSX.Element => {
          return (
            <CacheProvider value={cache}>
              <Component {...props} />
            </CacheProvider>
          );
        };
      },
    });
  };

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => {
    return (
      <style
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
        key={style.key}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    );
  });

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags],
  };
};
