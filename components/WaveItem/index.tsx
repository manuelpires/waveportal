import { useMemo } from "react";
import useENSName from "../../hooks/useENSName";
import styles from "./WaveItem.module.css";

interface Props extends Wave {}

const WaveItem = ({ from, message, date }: Props) => {
  const ENSName = useENSName(from);

  const shortenedHex = useMemo(
    () => `${from.substring(0, 6)}…${from.substring(from.length - 6)}`,
    [from]
  );

  const formatedDate = useMemo(
    () => `${date.toDateString()}, ${date.toLocaleTimeString()}`,
    [date]
  );

  return (
    <li className={styles.container}>
      <div className={styles.header}>
        <div className={styles.from}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://rinkeby.etherscan.io/address/${from}`}
          >
            {ENSName || shortenedHex}
          </a>
        </div>
        <div className={styles.date}>{formatedDate}</div>
      </div>
      <div className={styles.message}>{message}</div>
    </li>
  );
};

export default WaveItem;
