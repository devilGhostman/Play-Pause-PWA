import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import BottomBar from "../components/bottomBar/BottomBar";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Toaster
        toastOptions={{
          style: {
            background: "#181a1b",
            color: "#aaa",
          },
        }}
      />
      <Component {...pageProps} />
      <BottomBar />
    </SessionProvider>
  );
}

export default MyApp;
