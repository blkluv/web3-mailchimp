import React, { useState } from "react";

interface SchedulerProps {
  onScheduleChange: (interval: string) => void;
}

const Scheduler: React.FC<SchedulerProps> = ({ onScheduleChange }) => {
  const [selectedInterval, setSelectedInterval] = useState<string>(""); // State to track the selected interval

  const handleIntervalChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const interval = event.target.value;
    setSelectedInterval(interval);
    onScheduleChange(interval); // Notify the parent component about the selected interval
  };

  return (
    <div>
      <label>Select Schedule Interval: </label>
      <select value={selectedInterval} onChange={handleIntervalChange}>
        <option value="">Select Interval</option>
        <option value="5minutes">Every 5 Minutes</option>
        <option value="1hour">Every 1 Hour</option>
        <option value="1week">Every 1 Week</option>
      </select>
    </div>
  );
};

export default Scheduler;
