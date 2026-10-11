import { Card, Box, Typography, Chip } from "@mui/material";

export default function SensorCard({
  name,
  value,
  trueText = "שקט",
  falseText = "זוהתה פעילות",
  Icon,
  onClick,
}) {
  const activeColor = value ? "#00E676" : "#FF5252";
  const labelText = value ? trueText : falseText;

  return (
    <Card
      onClick={onClick}
      sx={{
        height: "120px",
        backgroundColor: "#111827",
        borderRadius: "16px",
        border: `1px solid ${value ? "rgba(0, 230, 118, 0.2)" : "rgba(255, 82, 82, 0.2)"}`,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s ease",
        cursor: "pointer",
        userSelect: "none",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: `0 8px 25px ${activeColor}20`,
          borderColor: activeColor,
        },
        "&:active": {
          transform: "scale(0.98)",
        },
      }}
    >
      {/* פס ניאון צדדי */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "4px",
          height: "100%",
          backgroundColor: activeColor,
          boxShadow: `0 0 10px ${activeColor}`,
        }}
      />

      <Box
        sx={{
          p: 2.5,
          height: "100%",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, minWidth: 0 }}>
          <Box
            sx={{
              p: 1.2,
              borderRadius: "12px",
              backgroundColor: `${activeColor}12`,
              color: activeColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {Icon && <Icon sx={{ fontSize: 26 }} />}
          </Box>

          <Typography
            variant="subtitle1"
            noWrap
            sx={{
              fontWeight: 600,
              color: "#F9FAFB",
              fontSize: "1rem",
              letterSpacing: "0.2px",
            }}
          >
            {name}
          </Typography>
        </Box>

        <Chip
          label={labelText}
          size="small"
          sx={{
            backgroundColor: `${activeColor}18`,
            color: activeColor,
            fontWeight: 700,
            fontSize: "0.75rem",
            borderRadius: "8px",
            border: `1px solid ${activeColor}40`,
            flexShrink: 0,
            px: 0.5,
          }}
        />
      </Box>
    </Card>
  );
}