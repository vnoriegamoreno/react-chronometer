import React from "react";
import Button from "./components/Button";
import Column from "./components/Column";
import Row from "./components/Row";
import _ from "lodash";
import "./styles.css";

const INITIAL_TIME = { hh: 0, mm: 0, ss: 0, ms: 0 };

const transformTime = (time) => {
  const { hh, mm, ss, ms } = time;
  const hour = hh.toString().length === 1 ? `0${hh}` : hh;
  const minutes = mm.toString().length === 1 ? `0${mm}` : mm;
  const seconds = ss.toString().length === 1 ? `0${ss}` : ss;
  const milliseconds =
    ms.toString().length === 1 ? `0${ms}` : ms.toString().substring(0, 2);
  return `${hour}:${minutes}:${seconds}.${milliseconds}`;
};

const updateTime = (refTime) => {
  const time = Object.assign({}, refTime);
  const { hh, mm, ss, ms } = time;
  time.ms = ms + 10;
  if (ms >= 1000) {
    time.ms = 0;
    time.ss = parseInt(ss, 10) + 1;
  }
  if (ss >= 60) {
    time.ss = 0;
    time.mm = parseInt(mm, 10) + 1;
  }
  if (mm >= 60) {
    time.mm = 0;
    time.hh = parseInt(hh, 10) + 1;
  }
  if (hh >= 24) {
    time.hh = parseInt(0, 10);
  }
  return time;
};

export default function App() {
  const [time, setTime] = React.useState(INITIAL_TIME);
  const [start, setStart] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (start) {
        setTime(updateTime(time));
      }
    }, 10);
    return () => clearInterval(interval);
  }, [time, start]);

  const onStart = (e) => {
    e.preventDefault();
    setStart(true);
  };
  const onRestart = (e) => {
    e.preventDefault();
    setTime(INITIAL_TIME);
    setStart(false);
  };
  const onStop = (e) => {
    e.preventDefault();
    setStart(false);
  };

  return (
    <div className="App">
      <form className="Form">
        <Column>
          <label label="Time">{transformTime(time)}</label>
          <Row>
            <Button label="Restart" onEvent={onRestart} variant="restart" />
            {!start && <Button label="Start" onEvent={onStart} />}
            {start && <Button label="Stop" onEvent={onStop} variant="stop" />}
          </Row>
        </Column>
      </form>
    </div>
  );
}
