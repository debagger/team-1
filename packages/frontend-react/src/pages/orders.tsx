import * as React from "react";
import { Timeline } from "react-svg-timeline";

export default function Orders() {
  const laneId = "demo-lane";
  const lanes = [
    {
      laneId,
      label: "Demo Lane",
    },
  ];
  const events = [
    {
      eventId: "event-1",
      tooltip: "Event 1",
      laneId,
      startTimeMillis: 1167606000000,
      endTimeMillis: 1230698892000,
    },
    {
      eventId: "event-2",
      tooltip: "Event 2",
      laneId: laneId,
      startTimeMillis: 1399845600000,
    },
  ];
  const dateFormat = (ms: number) => new Date(ms).toLocaleString();
  const ref = React.useRef<any>(null);
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    setWidth(ref?.current?.offsetWidth);
  }, []);

  React.useLayoutEffect(() => {
    const onResize = () => {
      setWidth(ref?.current?.offsetWidth);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div ref={ref}>
      <Timeline
        width={width}
        height={300}
        events={events}
        lanes={lanes}
        dateFormat={dateFormat}
      />
    </div>
  );
}
