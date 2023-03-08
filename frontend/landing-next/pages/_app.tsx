import '@unocss/reset/tailwind.css';
import 'uno.css';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';

export default appWithTranslation(({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
});
