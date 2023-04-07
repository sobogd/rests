import React from "react";
import { differenceInMinutes, format } from "date-fns";

export const TimeDifference: React.FC<{ timeInSeconds: number }> = ({
  timeInSeconds,
}) => {
  const [difference, setDifference] = React.useState<number>(0);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      const time = timeInSeconds;
      const nowTime = Math.round(new Date().getTime() / 1000);
      setDifference(nowTime - time);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const formattedDifference = format(new Date(difference * 1000), "mm:ss");

  return <> | {formattedDifference}</>;
};
