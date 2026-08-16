import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import SensorsGrid from "../components/sensorsComps/SensorsGrid";
import { selectAllSensors } from "../store/slices/sensorsSlice"; 

export default function SensorsPage() {
  const devices = useSelector(selectAllSensors);

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h6"
        sx={{ mb: 4, textAlign: "right", color: "#FFFFFF" }}
      >
        ניטור בזמן אמת
      </Typography>
      <SensorsGrid devices={devices} />
    </Box>
  );
}
