import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import SensorsGrid from "../components/sensorsComps/SensorsGrid";
import { selectAllSensors } from "../store/slices/sensorsSlice"; 

export default function SensorsPage() {
  const devices = useSelector(selectAllSensors);

  return (
    <Box sx={{ p: 3 }}>
      <SensorsGrid devices={devices} />
    </Box>
  );
}
