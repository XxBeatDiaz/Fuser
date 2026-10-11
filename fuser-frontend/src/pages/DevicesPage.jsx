import { Box, Typography } from "@mui/material";
import { DeviceButton } from "../components/TempButton";

const DevicesPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5">שליטה במכשירים ומפסקים</Typography>
      {/* כאן נשים בקרוב את כפתורי המכשירים הדינמיים */}
      <Box sx={{ mt: 2 }}>
        <DeviceButton />
      </Box>
    </Box>
  );
};

export default DevicesPage;
