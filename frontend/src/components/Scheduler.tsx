import React, { useState } from "react";

interface SchedulerProps {
  setScheduleSelected: (schedule: string) => void;
  scheduleSelected: string;
}

export const Scheduler: React.FC<SchedulerProps> = (props: any) => {
  const { scheduleSelected, setScheduleSelected } = props;

  const handleIntervalChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const interval = event.target.value;
    setScheduleSelected(interval);
  };

  return (
    <div>
      <label>Select Schedule Interval: </label>
      <select value={scheduleSelected} onChange={handleIntervalChange}>
        <option value="">Select Interval</option>
        <option value="5minutes">Every 5 minutes</option>
        <option value="1hour">In 1 minute</option>
      </select>
    </div>
  );
};

export default Scheduler;
