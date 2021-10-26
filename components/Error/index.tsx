import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import styles from "./Error.module.css";

const Error = () => {
  const { error } = useWeb3React();

  if (!error) {
    return null;
  }

  const isUnsupportedChainIdError = error instanceof UnsupportedChainIdError;

  return (
    <div className={styles.error}>
      {isUnsupportedChainIdError
        ? "Please select the Rinkeby test network"
        : "Error connecting"}
    </div>
  );
};

export default Error;
