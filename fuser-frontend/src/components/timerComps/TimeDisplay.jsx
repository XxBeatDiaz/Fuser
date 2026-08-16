import { Typography } from '@mui/material';

/**
 * רכיב תצוגה מבוסס MUI המציג שניות בפורמט שעון MM:SS
 * @param {number} seconds - כמות השניות להצגה
 * @param {object} sx - אובייקט עיצוב מותאם אישית של MUI (אופציונלי)
 * @param {string} variant - סגנון הטקסט מתוך ה-Theme של MUI (ברירת מחדל: body1)
 */
export const TimeDisplay = ({ seconds = 0, sx = {}, variant = 'body1', ...props }) => {
  
  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <Typography
      variant={variant}
      {...props}
      sx={{
        // מבטיח שהמספרים לא יזוזו וירקדו בכל פעם שהטיימר מתקדם
        fontVariantNumeric: 'tabular-nums', 
        fontFamily: 'monospace', // מומלץ לשעונים, אך לא חובה אם ה-Theme שלך תומך ב-tabular
        ...sx
      }}
    >
      {formatTime(seconds)}
    </Typography>
  );
};

export default TimeDisplay;