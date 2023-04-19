import { useState, useEffect } from "react";
import Card from "../UI/Card";

const Stopwatch = (props) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let intervalId;

    if (props.isRunning) {
      intervalId = setInterval(() => setTime(time + 1), 10);
      props.setTime(Math.round(time / 100));
    }

    return () => clearInterval(intervalId);
  }, [props.isRunning, time]);

  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);

  return (
    <Card className={props.className}>
      <div className="stopwatch">
        <p className="stopwatch-time">
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </p>
      </div>
    </Card>
  );
};

export default Stopwatch;
