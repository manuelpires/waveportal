import { useState, useEffect, useRef } from "react";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import MetaMaskOnboarding from "@metamask/onboarding";
import Button from "./Button";
import { injected } from "../connectors";
import styles from "../styles/Web3Connect.module.css";

type Props = {
  triedToEagerConnect: boolean;
};

const Web3Connect = ({ triedToEagerConnect }: Props) => {
  const { activate, active, error, setError } = useWeb3React();

  // initialize metamask onboarding
  const onboarding = useRef<MetaMaskOnboarding>();
  useEffect(() => {
    onboarding.current = new MetaMaskOnboarding();
  }, []);

  // manage connecting state for injected connector
  const [connecting, setConnecting] = useState(false);
  useEffect(() => {
    if (active || error) {
      setConnecting(false);
      onboarding.current?.stopOnboarding();
    }
  }, [active, error]);

  if (!triedToEagerConnect) {
    return null;
  }

  const hasMetaMaskOrWeb3Available =
    MetaMaskOnboarding.isMetaMaskInstalled() ||
    (window as any)?.ethereum ||
    (window as any)?.web3;

  const isUnsupportedChainIdError = error instanceof UnsupportedChainIdError;

  return (
    <>
      {hasMetaMaskOrWeb3Available ? (
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
          {MetaMaskOnboarding.isMetaMaskInstalled()
            ? "Connect to MetaMask"
            : "Connect to Wallet"}
        </Button>
      ) : (
        <Button onClick={() => onboarding.current?.startOnboarding()}>
          Install MetaMask
        </Button>
      )}

      {error && (
        <div className={styles.error}>
          {isUnsupportedChainIdError
            ? "Please connect to the Rinkeby network"
            : "Error connecting"}
        </div>
      )}
    </>
  );
};

export default Web3Connect;
