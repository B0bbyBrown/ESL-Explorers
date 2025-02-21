import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../components/auth/AuthProvider";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Header />
      <div className="page-container">
        <Component {...pageProps} />
      </div>
      <Footer />
    </AuthProvider>
  );
}
