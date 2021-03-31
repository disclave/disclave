import React from 'react';

export const AppHead: React.VFC = () => {
  const name = 'Disclave';
  const description = 'Use Disclave to comment on any website on the internet!';
  const themeColor = '#00a3ad';

  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
      <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />

      <link rel="manifest" href="/manifest.json" />

      <meta name="application-name" content={name} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={name} />
      <meta name="description" content={description} />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      {/* TODO: add browserconfig? */}
      {/*<meta name="msapplication-config" content="/static/icons/browserconfig.xml" />*/}
      {/* TODO: change color? */}
      <meta name="msapplication-TileColor" content="#2B5797" />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="theme-color" content={themeColor} />

      <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      {/* TODO: change color? */}
      <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
      <link rel="shortcut icon" href="/favicon.ico" />
      {/*<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />*/}

      {/*<meta name="twitter:card" content="summary" />*/}
      {/*<meta name="twitter:url" content="https://yourdomain.com" />*/}
      {/*<meta name="twitter:title" content="PWA App" />*/}
      {/*<meta name="twitter:description" content="Best PWA App in the world" />*/}
      {/*<meta*/}
      {/*  name="twitter:image"*/}
      {/*  content="https://yourdomain.com/static/icons/android-chrome-192x192.png"*/}
      {/*/>*/}
      {/*<meta name="twitter:creator" content="@DavidWShadow" />*/}
      {/*<meta property="og:type" content="website" />*/}
      {/*<meta property="og:title" content="PWA App" />*/}
      {/*<meta property="og:description" content="Best PWA App in the world" />*/}
      {/*<meta property="og:site_name" content="PWA App" />*/}
      {/*<meta property="og:url" content="https://yourdomain.com" />*/}
      {/*<meta*/}
      {/*  property="og:image"*/}
      {/*  content="https://yourdomain.com/static/icons/apple-touch-icon.png"*/}
      {/*/>*/}
    </>
  );
};
