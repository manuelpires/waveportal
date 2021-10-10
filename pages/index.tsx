import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";

const Home = () => (
  <Layout title="Wave Portal | Manuel Pires">
    <main className={styles.page}>
      <h1 className={styles.title}>👋 Hey there!</h1>
      <p className={styles.bio}>
        I&apos;m Manuel, a software engineer from Argentina. Connect your
        Ethereum wallet on the Rinkeby testnet and wave at me!
      </p>
    </main>
  </Layout>
);

export default Home;
