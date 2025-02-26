import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { AuthProvider } from "../contexts/authContext";

import styles from "../styles/layout/App.module.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
