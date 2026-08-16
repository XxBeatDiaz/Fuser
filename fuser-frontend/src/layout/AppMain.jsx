import { Box } from '@mui/material';

export const AppMain = ({ children }) => {
  return (
    <Box sx={{ direction: "rtl" }}>
      {children}
    </Box>
  );
}

export default AppMain;