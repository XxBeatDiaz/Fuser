import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectElapsedTime, selectGameStatus, selectIsPaused } from '../store/slices/roomSlice'; 
import { 
  solveCurrentRiddle, 
  moveToNextRiddle, 
  selectCheckRiddleSolution 
} from '../store/slices/riddlesSlice';

export const useRoomAutomation = () => {
  const dispatch = useDispatch();
  
  // ⏱️ מושך את נתוני מצב החדר המרכזיים
  const elapsedTime = useSelector(selectElapsedTime);
  const gameStatus = useSelector(selectGameStatus); // 'IDLE' | 'RUNNING' | 'COMPLETED'
  const isPaused = useSelector(selectIsPaused);     // true | false
  
  // 🧠 בודק בזמן אמת אם החיישנים הנוכחיים פותרים את החידה האקטיבית 
  const { shouldSolve, targetRiddleId } = useSelector(selectCheckRiddleSolution);

  useEffect(() => {
    // 🛑 חסימת קצה: אם תנאי החומרה הבשילו, אבל המשחק לא רץ כרגע או שהוא מושהה - עצור!
    if (gameStatus !== "RUNNING" || isPaused) {
      if (shouldSolve) {
        console.warn(`📡 [Automation Hook] נחסך ניסיון פתירה אוטומטי של חידה ${targetRiddleId} מכיוון שהחדר בסטטוס: ${gameStatus} (מושהה: ${isPaused})`);
      }
      return;
    }

    // ברגע שתנאי החומרה מבשילים עבור החידה הנוכחית
    if (shouldSolve && targetRiddleId) {
      console.log(`📡 [Automation Hook] חידה מספר ${targetRiddleId} שוחררה אוטומטית בזמן: ${elapsedTime} שניות.`);
      
      const currentTime = elapsedTime || 0;

      // 1. מעדכן את החידה הנוכחית ל-SOLVED ושומר את זמן הטיק המדויק מהחדר
      dispatch(solveCurrentRiddle({ 
        riddleId: targetRiddleId, 
        currentElapsedTime: currentTime, 
        isSkipped: false 
      }));

      // 2. מעבר אוטומטי לחידה הבאה ופתיחת הסטטוס שלה ל-IN_PROGRESS
      dispatch(moveToNextRiddle({ 
        currentElapsedTime: currentTime 
      }));
    }
  }, [shouldSolve, targetRiddleId, dispatch, elapsedTime, gameStatus, isPaused]);
};