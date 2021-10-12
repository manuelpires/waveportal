import { useWeb3React } from "@web3-react/core";
import Layout from "../components/Layout";
import WaveForm from "../components/WaveForm";
import WavesSection from "../components/WavesSection";
import Web3Connect from "../components/Web3Connect";
import useEagerConnect from "../hooks/useEagerConnect";
import styles from "../styles/Home.module.css";

const Home = () => {
  const { account, library } = useWeb3React();

  const triedToEagerConnect = useEagerConnect();

  const isConnected = typeof account === "string" && !!library;

  return (
    <Layout title="Wave Portal | Manuel Pires">
      <main className={styles.page}>
        <h1 className={styles.title}>👋 Hey there!</h1>
        <p className={styles.bio}>
          I&apos;m Manuel, a software engineer from Argentina. Connect your
          Ethereum wallet on the Rinkeby testnet and wave at me!
        </p>

        {isConnected ? (
          <>
            <WaveForm />
            <WavesSection />
          </>
        ) : (
          <Web3Connect triedToEagerConnect={triedToEagerConnect} />
        )}
      </main>
    </Layout>
  );
};

export default Home;
