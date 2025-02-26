import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "../contexts/SessionContext";
import ProtectedRoute from "../components/auth/ProtectedRoute ";

export function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <ProtectedRoute>
        <Component {...pageProps} />
      </ProtectedRoute>
    </SessionProvider>
  );
}

export default App;
