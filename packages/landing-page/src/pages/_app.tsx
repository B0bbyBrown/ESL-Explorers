import "../styles/globals.css";
import type { AppProps } from "next/app";

import { AuthProvider } from "../contexts/AuthContext";
import Head from "next/head";
import { Layout } from "../components/layout/Layout";

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="ESL Explorers - Learning Platform" />
        <title>ESL Explorers</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default App;
