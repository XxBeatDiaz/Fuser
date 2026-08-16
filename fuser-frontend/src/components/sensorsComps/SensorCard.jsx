import { Card, CardContent, Box, Typography, Chip } from "@mui/material";
import WifiIcon from '@mui/icons-material/Wifi';

export default function SensorCard({ name, value, trueText = "שקט", falseText = "זוהתה פעילות", Icon = WifiIcon }) {
  const color = value ? "#00E676" : "#FF5252";
  const labelText = value ? trueText : falseText;

  return (
    <Card
      sx={{
        backgroundColor: "#161B26",
        borderRadius: "16px",
        border: "1px solid #232D3F",
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
        width: '100%',
        height: '100%', // 🎯 ממלא תמיד את הריבוע הרישמי שהגריד מקצה לו
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      <CardContent 
        sx={{ 
          p: 3,
          height: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center' // שומר על הכל ממורכז אנכית בריבוע
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: '100%', gap: 1 }}>
          
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 0 }}>
            <Box sx={{ color: color, display: "flex", flexShrink: 0 }}>
              <Icon sx={{ fontSize: 28 }} />
            </Box>
            <Typography 
              variant="h6" 
              noWrap // 🎯 הגנה: טקסט ארוך לא ירד שורה ולא יעוות את הריבוע
              sx={{ fontWeight: 700, color: "#FFFFFF" }}
            >
              {name}
            </Typography>
          </Box>

          <Chip
            label={labelText}
            sx={{
              backgroundColor: `${color}15`,
              color: color,
              fontWeight: "bold",
              borderRadius: '8px',
              border: `1px solid ${color}`,
              flexShrink: 0 
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}