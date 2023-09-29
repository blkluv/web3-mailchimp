import React, { useState } from "react";

interface SchedulerProps {
  onScheduleChange: (interval: string) => void;
}

export const Sidebar = (props: any) => {
  const [selectedInterval, setSelectedInterval] = useState<string>(""); // State to track the selected interval

  const handleIntervalChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {};

  return <div className="flex-direction-row sidebar">sidebaaar</div>;
};

export default Sidebar;
