import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tab,
  Tabs,
  Box,
} from "@mui/material";
import { Settings, AccessTime, Router } from "@mui/icons-material";
// 🎯 שינוי השם לייבוא מדויק ללא כינויים
import TimeSettings from "./TimeSettings.jsx"; 
import { selectGameStatus, selectIsPaused } from "../../store/slices/roomSlice.js";

export const SettingsDialog = ({ open, onClose }) => {
  const [activeTab, setActiveTab] = useState(0);
  const gameStatus = useSelector(selectGameStatus);
  const isPaused = useSelector(selectIsPaused);
  const isGameRunningLive = gameStatus === "RUNNING" && !isPaused;

  // 🧠 ה-Ref מחזיק את פונקציית השמירה הישירה של הטאב האקטיבי
  const saveActionRef = useRef(null);

  const handleTabChange = (event, newValue) => {
    // מנקים את ה-Ref במעבר טאב כדי למנוע הרצת לוגיקה לא רלוונטית
    saveActionRef.current = null;
    setActiveTab(newValue);
  };

  // 🎯 התיקון: רישום פונקציית השמירה כפי שהיא מגיעה מהילד (ללא עטיפה כפולה)
  const registerSaveAction = (saveFn) => {
    saveActionRef.current = saveFn;
  };

  const handleSaveAndClose = () => {
    // מפעילים את הפונקציה הישירה שרשומה ב-Ref
    if (saveActionRef.current) {
      saveActionRef.current();
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1, fontWeight: "bold", pb: 1 }}>
        <Settings color="primary" />
        הגדרות מערכת
      </DialogTitle>

      {/* מערכת הטאבים של MUI */}
      <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth" indicatorColor="primary" textColor="primary">
        <Tab icon={<AccessTime sx={{ fontSize: 20 }} />} label="זמן וטיימר" />
        <Tab icon={<Router sx={{ fontSize: 20 }} />} label="רכיבי קצה" /> 
      </Tabs>

      <DialogContent dividers sx={{ minHeight: 200 }}>
        {activeTab === 0 && (
          <TimeSettings onRegisterSave={registerSaveAction} open={open} />
        )}
        {activeTab === 1 && (
          <Box sx={{ p: 2 }}>הגדרות רכיבי זיגבי ואוטומציות (בעתיד)...</Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleSaveAndClose} color="primary" variant="contained" fullWidth sx={{ fontWeight: "bold", borderRadius: 2, py: 1 }}>
          {isGameRunningLive ? "סגור חלון" : "שמור וסנכרן"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingsDialog;