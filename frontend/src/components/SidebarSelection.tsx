import React, { useState } from "react";
import Scheduler from "./Scheduler";

interface SchedulerProps {
  onScheduleChange: (interval: string) => void;
}

export const Sidebar = (props: any) => {
  const { setScheduleSelected, scheduleSelected } = props;

  const handleIntervalChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {};

  return (
    <div className="flex-direction-row sidebar">
      <Scheduler
        setScheduleSelected={setScheduleSelected}
        scheduleSelected={scheduleSelected}
      />
    </div>
  );
};

export default Sidebar;
