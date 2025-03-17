import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/layout/Header-Footer/Header";
import Footer from "../components/layout/Header-Footer/Footer";
import { AuthProvider } from "../contexts/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
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
