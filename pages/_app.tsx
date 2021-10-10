import type { AppProps } from "next/app";
import { Web3ReactProvider } from "@web3-react/core";
import getLibrary from "../getLibrary";
import "../styles/globals.css";

const WavePortalApp = ({ Component, pageProps }: AppProps) => (
  <Web3ReactProvider getLibrary={getLibrary}>
    <Component {...pageProps} />
  </Web3ReactProvider>
);

export default WavePortalApp;
