import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import '@tremor/react/dist/esm/tremor.css';

import Navbar from "@/components/layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar user={null} />
      <Component {...pageProps} />
    </>
  );
}
