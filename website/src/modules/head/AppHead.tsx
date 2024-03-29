import React from 'react';

export const AppHead: React.VFC = () => {
  // TODO: move to consts?
  const name = 'Disclave';
  const description = 'Use Disclave to comment on any website on the internet!';
  const themeColor = '#00a3ad';

  return (
    <>
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
    </>
  );
};
