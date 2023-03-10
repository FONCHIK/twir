import type { AppProps } from 'next/app';
import '../global.css';

export default ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};
