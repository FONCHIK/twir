import { Html, Head, Main, NextScript, DocumentProps } from 'next/document';

import { i18n } from '../next-i18next.config.js';

export default function Document({ __NEXT_DATA__ }: DocumentProps) {
  const currentLocale = __NEXT_DATA__.locale || i18n.defaultLocale;

  return (
    <Html lang={currentLocale}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
