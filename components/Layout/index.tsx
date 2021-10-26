import { ReactNode } from "react";
import Head from "next/head";
import styles from "./Layout.module.css";

type Props = {
  children?: ReactNode;
  title: string;
};

const Layout = ({ children, title }: Props) => (
  <>
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    {children}
    <div className={styles.backgroundRadialGradient} />
  </>
);

export default Layout;
