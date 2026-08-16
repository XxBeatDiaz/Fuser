import { Box, Typography, Paper, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// פונקציית עזר פשוטה לעיצוב זמן בפורמט MM:SS
const formatTime = (seconds) => {
  if (seconds === null || seconds === undefined || isNaN(seconds)) return "00:00";
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
};

export const RiddleCard = ({ riddle, isCurrent, isSolved, isLocked, riddleColor, duration, onClick }) => {
  return (
    <Paper
      elevation={0}
      onClick={onClick}
      sx={{
        p: { xs: 2.5, sm: 3.5 },
        width: '100%',
        maxWidth: '380px',
        borderRadius: '16px',
        bgcolor: isCurrent ? 'rgba(20, 20, 28, 0.8)' : isSolved ? 'rgba(13, 22, 16, 0.4)' : 'rgba(14, 14, 18, 0.4)',
        backdropFilter: 'blur(8px)',
        
        border: isCurrent ? `1px solid ${riddleColor}` : '1px solid rgba(38, 38, 54, 0.5)',
        borderLeft: `6px solid ${isCurrent || isSolved ? riddleColor : '#262633'}`,
        
        cursor: isCurrent ? 'pointer' : 'default',
        boxShadow: isCurrent ? `0 0 35px ${riddleColor}25` : 'none',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',

        '&:hover': isCurrent ? {
          transform: 'translateY(-4px)',
          boxShadow: `0 12px 40px ${riddleColor}40`,
          bgcolor: 'rgba(25, 25, 36, 0.9)',
        } : {},
      }}
    >
      {/* שורת כותרת וסטטוס עליונה */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 1, mb: 2 }}>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            fontWeight: 800, 
            color: isCurrent ? '#FFF' : isLocked ? '#62627A' : '#C4C4D4',
            fontSize: '14px',
            letterSpacing: '0.3px'
          }}
        >
          {riddle.name}
        </Typography>
        
        {isCurrent && (
          <Chip 
            icon={<TouchAppIcon sx={{ '&&': { color: '#000', fontSize: '13px', marginRight: -0.5, marginLeft: 0.5 } }} />}
            label="בצע מעקף" 
            size="small" 
            sx={{ 
              bgcolor: riddleColor, 
              color: '#000', 
              fontWeight: 900, 
              fontSize: '9px',
              height: '20px',
              boxShadow: `0 0 10px ${riddleColor}40`,
              animation: 'pulse 2s infinite ease-in-out',
              '@keyframes pulse': {
                '0%': { opacity: 0.8 },
                '50%': { opacity: 1 },
                '100%': { opacity: 0.8 },
              }
            }} 
          />
        )}
        {isSolved && (
          <Typography variant="caption" sx={{ color: '#4EEE6D', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '12px' }}>
            <CheckCircleIcon sx={{ fontSize: 15 }} /> בוצע
          </Typography>
        )}
      </Box>

      {/* תיאור הפעילות */}
      <Typography 
        variant="body2" 
        sx={{ 
          color: isCurrent ? '#BFC0CE' : isLocked ? '#48485C' : '#8A8A9E', 
          lineHeight: 1.6, 
          fontSize: '12.5px',
          mb: riddle.hint || !isLocked ? 2 : 0
        }}
      >
        {riddle.description}
      </Typography>

      {/* קוביות מידע טכני / חומרה */}
      {riddle.hint && (
        <Box sx={{ mt: 2, pt: 1.5, borderTop: '1px solid rgba(255, 255, 255, 0.04)', mb: !isLocked ? 2 : 0 }}>
          <Box sx={{ bgcolor: isCurrent ? 'rgba(255,255,255,0.03)' : 'transparent', p: '6px 10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.02)' }}>
            <Typography 
              variant="caption" 
              display="block" 
              sx={{ 
                color: isCurrent ? riddleColor : isSolved ? '#4EEE6D' : '#48485C', 
                fontSize: '17px', 
                fontWeight: 700,
                fontFamily: 'monospace',
                whiteSpace: 'normal',
                wordBreak: 'break-word'
              }}
            >
              {riddle.hint}
            </Typography>
          </Box>
        </Box>
      )}

      {/* ⏱️ תצוגת טיימר החידה המעודכן - מוצג רק עבור חידות פתורות או החידה הנוכחית */}
      {!isLocked && (
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'flex-end',
            gap: 0.5, 
            mt: 1,
            color: isCurrent ? riddleColor : 'text.secondary',
            opacity: isCurrent ? 1 : 0.7
          }}
        >
          <AccessTimeIcon sx={{ fontSize: 14 }} />
          <Typography 
            variant="caption" 
            sx={{ 
              fontFamily: 'monospace', 
              fontWeight: 700,
              fontSize: '11px' 
            }}
          >
            {isSolved ? `נפתרה ב: ${formatTime(riddle.duration)}` : `זמן נוכחי: ${formatTime(duration)}`}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};