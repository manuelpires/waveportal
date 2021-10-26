import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import Error from "../Error";
import Button from "../Button";
import useMetaMaskOnboarding from "../../hooks/useMetaMaskOnboarding";
import { injected } from "../../connectors";

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

  return (
    <>
      <Error />

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
