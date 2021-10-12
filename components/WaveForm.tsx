import { useState } from "react";
import Button from "./Button";
import useWavePortalContract from "../hooks/useWavePortalContract";
import styles from "../styles/WaveForm.module.css";

const WaveForm = () => {
  const [message, setMessage] = useState("");
  const [isMiningTx, setIsMiningTx] = useState(false);

  const wavePortalContract = useWavePortalContract();

  const wave = async () => {
    try {
      if (wavePortalContract) {
        setIsMiningTx(true);
        const waveTx = await wavePortalContract.wave(message, {
          gasLimit: 300000,
        });
        console.log("Mining transaction...");
        await waveTx.wait();
        console.log("Mined -- Tx hash:", waveTx.hash);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setMessage("");
      setIsMiningTx(false);
    }
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        name="message"
        placeholder="Leave me a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={isMiningTx}
      />

      <Button disabled={isMiningTx} onClick={wave}>
        {isMiningTx ? "Sending 👋 ..." : "Wave at me"}
      </Button>
    </div>
  );
};

export default WaveForm;
