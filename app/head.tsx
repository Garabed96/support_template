import React from "react";
export default function Head() {
  return (
    <React.Fragment>
      <title>Ord kit Support Tickets</title>
      <meta name="application-name" content="PWA App" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="support" />
      <meta name="description" content="The Premier Ordinals Toolkit" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-TileColor" content="#2B5797" />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="theme-color" content="#000" />

      <link rel="apple-touch-icon" href="/logos/gg.png" />
      <link rel="shortcut icon" href="/public/favicon.ico" />

      <link rel="manifest" href="/public/manifest.json" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content="https://twitter.com/" />
      <meta name="twitter:title" content="support" />
      <meta
        name="twitter:description"
        content="A premier tool suite for founders, builders, and creatives looking to build in the ordinal ecosystem"
      />
      <meta
        name="twitter:image"
        content="https://pbs.twimg.com/profile_images/1630364376896098304/vysdVGL9_400x400.jpg"
      />
      <meta name="twitter:creator" content="@support" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="support" />
      <meta property="og:description" content="The Premier Ordinals Toolkit" />
      <meta property="og:site_name" content="support" />
      <meta property="og:url" content="https://support.xyz" />
      <meta
        property="og:image"
        content="https://support.xyz/logos/primary-logo.svg"
      />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />
    </React.Fragment>
  );
}
