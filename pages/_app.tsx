import type { AppProps } from "next/app";
import "../styles/globals.css";

function WavePortalApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default WavePortalApp;
