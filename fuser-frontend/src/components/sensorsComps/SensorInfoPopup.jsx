import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Chip,
  Button,
  Divider,
  IconButton,
  LinearProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import WifiIcon from "@mui/icons-material/Wifi";
import SensorsIcon from "@mui/icons-material/Sensors";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RouterIcon from "@mui/icons-material/Router";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import LockIcon from "@mui/icons-material/Lock";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import BatteryFullIcon from "@mui/icons-material/BatteryFull";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";

export default function SensorInfoPopup({ open, onClose, sensor }) {
  if (!sensor) return null;

  const activeColor = sensor.value ? "#00E676" : "#FF5252";
  const labelText = sensor.value
    ? sensor.trueText || "פעיל"
    : sensor.falseText || "לא פעיל";
  const IconComponent = sensor.Icon || WifiIcon;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: "#111827",
          color: "#F9FAFB",
          borderRadius: "20px",
          border: `1px solid ${activeColor}40`,
          boxShadow: `0 10px 40px rgba(0, 0, 0, 0.8), 0 0 20px ${activeColor}15`,
          backgroundImage: "none",
          p: 1,
        },
      }}
    >
      {/* כותרת הפופאפ */}
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pb: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              p: 1,
              borderRadius: "12px",
              backgroundColor: `${activeColor}18`,
              color: activeColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconComponent sx={{ fontSize: 28 }} />
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, fontSize: "1.1rem" }}
            >
              {sensor.name}
            </Typography>
            <Typography variant="caption" sx={{ color: "#9CA3AF" }}>
              {sensor.id}
            </Typography>
          </Box>
        </Box>

        <IconButton
          onClick={onClose}
          sx={{ color: "#9CA3AF", "&:hover": { color: "#FFF" } }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider sx={{ borderColor: "#1F2937", mx: 2 }} />

      <DialogContent sx={{ py: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.8 }}>
          {/* סטטוס מרכזי */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 1.5,
              borderRadius: "12px",
              backgroundColor: "#1F2937",
            }}
          >
            <Typography variant="body2" sx={{ color: "#9CA3AF" }}>
              סטטוס נוכחי
            </Typography>
            <Chip
              label={labelText}
              size="small"
              sx={{
                backgroundColor: `${activeColor}20`,
                color: activeColor,
                fontWeight: 700,
                borderRadius: "8px",
                border: `1px solid ${activeColor}`,
              }}
            />
          </Box>

          {/* 🟢 נתונים מותאמים אישית - תאורה (Brightness & Color Temp) */}
          {sensor.brightness !== undefined && (
            <Box
              sx={{ p: 1.5, borderRadius: "12px", backgroundColor: "#1F2937" }}
            >
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: "#9CA3AF",
                  }}
                >
                  <WbSunnyIcon fontSize="small" />
                  <Typography variant="body2">עוצמת תאורה</Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: "#E5E7EB" }}
                >
                  {sensor.brightness}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={sensor.brightness}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: "#374151",
                  "& .MuiLinearProgress-bar": { backgroundColor: "#FBBF24" },
                }}
              />
            </Box>
          )}

          {sensor.colorTemp !== undefined && (
            <Box
              sx={{ display: "flex", justifyContent: "space-between", px: 1 }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "#9CA3AF",
                }}
              >
                <ThermostatIcon fontSize="small" />
                <Typography variant="body2">טמפרטורת אור</Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "#E5E7EB" }}
              >
                {sensor.colorTemp} K
              </Typography>
            </Box>
          )}

          {/* 🟢 נתונים מותאמים אישית - הספק/חשמל (Power) */}
          {sensor.power !== undefined && (
            <Box
              sx={{ display: "flex", justifyContent: "space-between", px: 1 }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "#9CA3AF",
                }}
              >
                <FlashOnIcon fontSize="small" />
                <Typography variant="body2">צריכת חשמל / הספק</Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "#E5E7EB" }}
              >
                {sensor.power} W
              </Typography>
            </Box>
          )}
          {/* 🟢 עוצמת קליטה (Link Quality / LQI) */}
          {sensor.linkquality !== undefined && sensor.linkquality !== null && (
            <Box
              sx={{ display: "flex", justifyContent: "space-between", px: 1 }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "#9CA3AF",
                }}
              >
                <SignalCellularAltIcon fontSize="small" />
                <Typography variant="body2">עוצמת קליטה (LQI)</Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "#E5E7EB" }}
              >
                {sensor.linkquality} LQI
              </Typography>
            </Box>
          )}

          {/* 🟢 רמת סוללה */}
          {sensor.battery !== undefined && sensor.battery !== null && (
            <Box
              sx={{ display: "flex", justifyContent: "space-between", px: 1 }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "#9CA3AF",
                }}
              >
                <BatteryFullIcon fontSize="small" />
                <Typography variant="body2">רמת סוללה</Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: sensor.battery < 20 ? "#FF5252" : "#00E676",
                }}
              >
                {sensor.battery}%
              </Typography>
            </Box>
          )}

          {/* 🟢 נתונים מותאמים אישית - נעילת ילדים (Child Lock) */}
          {sensor.childLock !== undefined && (
            <Box
              sx={{ display: "flex", justifyContent: "space-between", px: 1 }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "#9CA3AF",
                }}
              >
                <LockIcon fontSize="small" />
                <Typography variant="body2">נעילת ילדים</Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: sensor.childLock ? "#00E676" : "#9CA3AF",
                }}
              >
                {sensor.childLock ? "נעול" : "פתוח"}
              </Typography>
            </Box>
          )}

          {/* נתונים טכניים כלליים */}
          <Divider sx={{ borderColor: "#1F2937", my: 0.5 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between", px: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "#9CA3AF",
              }}
            >
              <SensorsIcon fontSize="small" />
              <Typography variant="body2">סוג חיישן</Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, color: "#E5E7EB" }}
            >
              {sensor.type}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", px: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "#9CA3AF",
              }}
            >
              <AccessTimeIcon fontSize="small" />
              <Typography variant="body2">עדכון אחרון</Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, color: "#E5E7EB" }}
            >
              {sensor.lastUpdated || "לפני מספר שניות"}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", px: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "#9CA3AF",
              }}
            >
              <RouterIcon fontSize="small" />
              <Typography variant="body2">בקר מחובר</Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, color: "#E5E7EB" }}
            >
              {sensor.controller || "Zigbee2MQTT"}
            </Typography>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 2, pb: 1.5 }}>
        <Button
          onClick={onClose}
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: "#374151",
            color: "#FFF",
            borderRadius: "10px",
            fontWeight: 600,
            textTransform: "none",
            "&:hover": { backgroundColor: "#4B5563" },
          }}
        >
          סגור
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ... בתוך DialogContent בקומפוננטה SensorInfoPopup:
