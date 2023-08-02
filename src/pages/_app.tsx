import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import Layout from "./layout/Layout";
import { StateServiceProvider } from '@/shared/StateService';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StateServiceProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StateServiceProvider>
  )
}
