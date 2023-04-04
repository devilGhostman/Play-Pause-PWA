import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import BottomBar from "../components/bottomBar/BottomBar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Component {...pageProps} />
      <BottomBar />
    </SessionProvider>
  );
}

export default MyApp;
