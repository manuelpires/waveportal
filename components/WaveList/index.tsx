import { ReactNode } from "react";
import styles from "./WaveList.module.css";

type Props = {
  children?: ReactNode;
};

const WaveList = ({ children }: Props) => (
  <ol className={styles.list}>{children}</ol>
);

export default WaveList;
