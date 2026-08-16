import { Grid } from "@mui/material";
import SensorCard from "./SensorCard";

export default function SensorsGrid({ devices }) {
  const currentDevices = Array.isArray(devices) ? devices : [];

  return (
    <Grid container spacing={4}>
      {currentDevices.map((sensor) => (
        <Grid 
          key={sensor.id} 
          xs={12} 
          sm={6} 
          md={4}
          sx={{
            display: 'flex', 
            minHeight: { xs: '120px', sm: '140px', md: '150px' } 
          }}
        >
          <SensorCard 
            name={sensor.name}
            value={sensor.value}
            trueText={sensor.trueText}
            falseText={sensor.falseText}
            Icon={sensor.Icon}
          />
        </Grid>
      ))}
    </Grid>
  );
}