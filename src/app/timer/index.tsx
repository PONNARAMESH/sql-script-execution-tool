import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

export const Timer = () => {
  const [counter, setCounter] = useState<number>(0);
  const [start, setStart] = useState<boolean>(false);

  useEffect(() => {
    if (!start) return;
    const timer = setTimeout(() => {
      setCounter(counter + 1);
    }, 100);
    return () => {
      clearTimeout(timer);
    };
  }, [counter, start]);

  const handleStart = () => {
    setStart(true);
  };
  const handlePause = () => {
    setStart(false);
  };
  const handleReset = () => {
    setCounter(0);
    setStart(false);
  };

  const calculateTimer = (counter: number) => {
    let sec: number | string = counter;
    if (!sec) return { hours: "00", minutes: "00", seconds: "00" };

    const hours = (Math.trunc(sec / (60 * 60)) % 24)
      .toString()
      .padStart(2, "0");
    sec = sec % (60 * 60);

    const minutes = Math.trunc(sec / 60)
      .toString()
      .padStart(2, "0");
    sec = (sec % 60).toString().padStart(2, "0");

    return { hours, minutes, seconds: sec };
  };

  const { hours, minutes, seconds } = calculateTimer(counter);

  return (
    <div className={styles.timerContainer}>
      <h1>Hi form TIMER!</h1>
      <pre>
        <span>Format(HH:MM:SS)</span> : {`${hours}:${minutes}:${seconds}`}
      </pre>
      <div className={styles.buttonsContainer}>
        <button onClick={handleStart}>Start / Resume</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleReset}>Re-Set</button>
      </div>
    </div>
  );
};
