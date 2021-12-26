import { ReactNode } from "react";
import Head from "next/head";
import styles from "./Layout.module.css";

type Props = {
  children?: ReactNode;
  title: string;
  description: string;
};

const Layout = ({ children, title, description }: Props) => (
  <>
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />

      <meta property="og:title" content={title} key="ogtitle" />
      <meta property="og:description" content={description} key="ogdesc" />
      <meta property="og:image" content="/image.png" key="ogimage" />
    </Head>
    {children}
    <div className={styles.backgroundRadialGradient} />
  </>
);

export default Layout;
