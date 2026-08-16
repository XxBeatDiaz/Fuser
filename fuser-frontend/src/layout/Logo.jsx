import { Box, Typography } from "@mui/material";

export const Logo = () => {

  return (
    <Box sx={{ textAlign: "left", width: { xs: "100%", md: "auto" } }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: 800,
          letterSpacing: "10px",
          color: "#00E5FF",
          fontFamily: "monospace",
          textShadow: "2px 3px 5px rgba(0, 229, 255, 0.5)",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        ^FUSER
        <img
          src="Logo.png"
          alt="Fuser Logo"
          style={{ width: 44, height: 44 }}
        />
      </Typography>
    </Box>
  );
};

export default Logo;
