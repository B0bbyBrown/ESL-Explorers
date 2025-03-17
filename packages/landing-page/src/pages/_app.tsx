import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/layout/Header-Footer/Header";
import Footer from "../components/layout/Header-Footer/Footer";
import { AuthProvider } from "../contexts/AuthContext";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Your site description" />
      </Head>
      <div className="page-container">
        <Header />
        <div className="content">
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}
