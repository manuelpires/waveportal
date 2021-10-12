import { useState, useEffect, useCallback } from "react";
import WaveItem from "./WaveItem";
import useWavePortalContract from "../hooks/useWavePortalContract";
import styles from "../styles/WavesSection.module.css";

const WavesSection = () => {
  const [waves, setWaves] = useState<Wave[]>([]);

  const wavePortalContract = useWavePortalContract();

  const getAllWaves = useCallback(async () => {
    if (wavePortalContract) {
      const res = await wavePortalContract.getAllWaves();
      setWaves(
        res
          .map((wave) => ({
            ...wave,
            date: new Date(Number(wave.timestamp) * 1000),
          }))
          .reverse()
      );
    }
  }, [wavePortalContract]);

  const subscribeToEvent = useCallback(async () => {
    if (wavePortalContract) {
      const eventFilter = wavePortalContract.filters.NewWave(null);
      wavePortalContract.on(eventFilter, (from, message, timestamp) => {
        console.log("NewWave Event:", { from, message, timestamp });
        setWaves((prevState) => [
          {
            from,
            message,
            date: new Date(Number(timestamp) * 1000),
          },
          ...prevState,
        ]);
      });
    }
  }, [wavePortalContract]);

  useEffect(() => {
    getAllWaves();
    subscribeToEvent();
    return () => {
      wavePortalContract?.removeAllListeners();
    };
  }, [getAllWaves, subscribeToEvent, wavePortalContract]);

  return (
    <section>
      {waves.length > 0 && (
        <>
          <p className={styles.info}>
            {`I've received ${waves.length} waves so far 🥰`}
          </p>
          <ol className={styles.list}>
            {waves.map((wave, i) => (
              <WaveItem
                key={String(i)}
                from={wave.from}
                message={wave.message}
                date={wave.date}
              />
            ))}
          </ol>
        </>
      )}
    </section>
  );
};

export default WavesSection;
