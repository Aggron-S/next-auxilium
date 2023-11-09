import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import Layout from "./layout/Layout";
import { StateServiceProvider } from '@/shared/StateService';
import { ModalStateServiceProvider } from '@/shared/ModalStateService';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StateServiceProvider>
      <Layout>
        <ModalStateServiceProvider>

          <Component {...pageProps} />

        </ModalStateServiceProvider>
      </Layout>
    </StateServiceProvider>
  )
}
