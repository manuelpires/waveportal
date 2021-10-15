import { useState, useEffect } from "react";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { injected } from "../connectors";
import useMetaMaskOnboarding from "../hooks/useMetaMaskOnboarding";
import Button from "./Button";
import styles from "../styles/Web3Connect.module.css";

type Props = {
  triedToEagerConnect: boolean;
};

const Web3Connect = ({ triedToEagerConnect }: Props) => {
  const { account, activate, active, error, setError } = useWeb3React();

  const {
    isMetaMaskInstalled,
    isWeb3Available,
    startOnboarding,
    stopOnboarding,
  } = useMetaMaskOnboarding();

  // manage connecting state for injected connector
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    if (active || error) {
      setConnecting(false);
      stopOnboarding();
    }
  }, [active, error, stopOnboarding]);

  if (!triedToEagerConnect || typeof account === "string") {
    return null;
  }

  const isUnsupportedChainIdError = error instanceof UnsupportedChainIdError;

  return (
    <>
      {error && (
        <div className={styles.error}>
          {isUnsupportedChainIdError
            ? "Please select the Rinkeby test network"
            : "Error connecting"}
        </div>
      )}

      {isWeb3Available ? (
        <Button
          disabled={connecting}
          onClick={() => {
            setConnecting(true);

            activate(injected, undefined, true).catch((error) => {
              // ignore the error if it's a user rejected request
              if (error instanceof UserRejectedRequestError) {
                setConnecting(false);
              } else {
                setError(error);
              }
            });
          }}
        >
          {isMetaMaskInstalled ? "Connect to MetaMask" : "Connect to Wallet"}
        </Button>
      ) : (
        <Button onClick={startOnboarding}>Install MetaMask</Button>
      )}
    </>
  );
};

export default Web3Connect;
