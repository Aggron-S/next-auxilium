import Head from 'next/head';
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import Layout from "./layout/Layout";
import { StateServiceProvider } from '@/shared/StateService';
import { ModalStateServiceProvider } from '@/shared/ModalStateService';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Auxilium</title>
        <link rel="icon" href="/assets/auxilium-play-logo.png" />
      </Head>
      
      <StateServiceProvider>
        <Layout>
          <ModalStateServiceProvider>

            <Component {...pageProps} />

          </ModalStateServiceProvider>
        </Layout>
      </StateServiceProvider>
    </>
  )
}
