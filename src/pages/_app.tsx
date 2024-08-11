import Head from 'next/head';
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import Layout from "./layout/Layout";
import { StateServiceProvider } from '@/shared/StateService';
import { ModalStateServiceProvider } from '@/shared/ModalStateService';

// Stripe
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

export default function App({ Component, pageProps }: AppProps) {
  // Stripe Payment Pubishable key validation
  if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
  }
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
  
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
            <Elements
              stripe={stripePromise}
              options={{
                mode: "payment",
                amount: 500,
                currency: "usd",
              }}
            >
              <Component {...pageProps} />
            </Elements>

          </ModalStateServiceProvider>
        </Layout>
      </StateServiceProvider>
    </>
  )
}
