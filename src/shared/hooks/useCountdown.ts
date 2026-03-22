import { useEffect, useState } from "react";

const useCountdown = (seconds: number) => {
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const interval = setInterval(
      () => setSecondsLeft((prev) => prev - 1),
      1000,
    );
    return () => clearInterval(interval);
  }, [secondsLeft]);

  return { secondsLeft, start: () => setSecondsLeft(seconds) };
};
export default useCountdown;
