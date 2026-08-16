import { Stack } from '@mui/material';
import { PlayArrow, Pause, Refresh, CheckCircle } from '@mui/icons-material';
import ControlButton from './ControlButton';

export const Controls = ({ gameStatus, isPaused, onStart, onTogglePause, onEnd, onReset }) => {
  return (
    <Stack direction="row" spacing={1} justifyContent="center" width="100%">
      
      {/* 1. כפתור הפעלה / השהיה דינמי */}
      {gameStatus === 'IDLE' ? (
        // במצב IDLE - מציג חץ הפעלה ירוק
        <ControlButton 
          color="success" 
          onClick={onStart}
          title="הפעל חדר"
        >
          <PlayArrow />
        </ControlButton>
      ) : (
        // כשהמשחק רץ (או מושהה) - נשאר אייקון השהיה (שווה מאונך) ורק משנה צבע
        <ControlButton 
          color={isPaused ? "warning" : "success"} // לחיצה ראשונה (רץ) = ירוק, לחיצה שנייה (מושהה) = כתום
          onClick={onTogglePause}
          disabled={gameStatus === 'COMPLETED'} // נועל את הכפתור אם המשחק נגמר
          title={isPaused ? "המשך משחק" : "השהה משחק"}
        >
          <Pause />
        </ControlButton>
      )}

      {/* 2. כפתור סיום משחק */}
      <ControlButton 
        color="secondary" 
        onClick={onEnd}
        disabled={gameStatus === 'IDLE' || gameStatus === 'COMPLETED'} // פעיל רק כשהמשחק רץ
        title="סיום משחק"
      >
        <CheckCircle />
      </ControlButton>

      {/* 3. כפתור איפוס (נשאר קבוע, חסום רק ב-IDLE) */}
      <ControlButton 
        variant="outlined" 
        color="error" 
        onClick={onReset}
        disabled={gameStatus === 'IDLE'}
        title="איפוס חדר"
      >
        <Refresh />
      </ControlButton>

    </Stack>
  );
};

export default Controls;