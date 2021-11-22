import { useState, useEffect, useCallback } from "react";
import WaveList from "../WaveList";
import WaveItem from "../WaveItem";
import useWavePortalContract from "../../hooks/useWavePortalContract";
import styles from "./WavesSection.module.css";

const WavesSection = () => {
  const [waves, setWaves] = useState<Wave[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const wavePortalContract = useWavePortalContract();

  const getAllWaves = useCallback(async () => {
    if (wavePortalContract) {
      const allWaves = await wavePortalContract.getAllWaves();
      setWaves(
        allWaves
          .map((wave) => ({
            ...wave,
            date: new Date(Number(wave.timestamp) * 1000),
          }))
          .reverse()
      );
      setIsLoading(false);
    }
  }, [wavePortalContract]);

  const subscribeToEvent = useCallback(() => {
    if (wavePortalContract) {
      const eventFilter = wavePortalContract.filters.NewWave(null);
      wavePortalContract.on(eventFilter, async (from, message, timestamp) => {
        console.log("NewWave Event:", { from, message, timestamp });
        await getAllWaves();
      });
    }
  }, [wavePortalContract, getAllWaves]);

  useEffect(() => {
    getAllWaves();
    subscribeToEvent();
    return () => {
      wavePortalContract?.removeAllListeners();
    };
  }, [getAllWaves, subscribeToEvent, wavePortalContract]);

  if (isLoading) {
    return null;
  }

  if (waves.length === 0) {
    return <p className={styles.info}>No waves so far, be the first one!</p>;
  }

  return (
    <section>
      <p className={styles.info}>
        {`I've received ${waves.length} waves so far 🥰`}
      </p>
      <WaveList>
        {waves.map((wave, i) => (
          <WaveItem key={String(i)} {...wave} />
        ))}
      </WaveList>
    </section>
  );
};

export default WavesSection;
