import { useState } from "react";
import { Box } from "@mui/material";
import SensorCard from "./SensorCard";
import SensorInfoPopup from "./SensorInfoPopup";

export default function SensorsGrid({ devices }) {
  const [selectedSensor, setSelectedSensor] = useState(null);
  const currentDevices = Array.isArray(devices) ? devices : [];

  const handleOpenPopup = (sensor) => {
    setSelectedSensor(sensor);
  };

  const handleClosePopup = () => {
    setSelectedSensor(null);
  };

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 2.5,
          width: "100%",
        }}
      >
        {currentDevices.map((sensor) => (
          <SensorCard
            key={sensor.id || sensor.name}
            name={sensor.name}
            value={sensor.value}
            trueText={sensor.trueText}
            falseText={sensor.falseText}
            Icon={sensor.Icon}
            onClick={() => handleOpenPopup(sensor)}
          />
        ))}
      </Box>

      <SensorInfoPopup
        open={Boolean(selectedSensor)}
        onClose={handleClosePopup}
        sensor={selectedSensor}
      />
    </>
  );
}