import { useState } from 'react';
import { Fab } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsDialog from './SettingsDialog'; // ייבוא הדיאלוג שבנינו

export const SettingsBtn = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpen = () => setIsDialogOpen(true);
  const handleClose = () => setIsDialogOpen(false);

  return (
    <>
      {/* כפתור צף קבוע על המסך */}
      <Fab
        color="primary"
        aria-label="settings"
        onClick={handleOpen}
        sx={{
          position: 'fixed',
          bottom: { xs: 20, md: 27 }, // מתאים את עצמו גם למובייל
          right: { xs: 17, md: 24 },   // שמאל תחתונה (כדי לא להפריע לטקסט בעברית מימין)
          boxShadow: 4,
          zIndex: 1100, // דואג שיהיה מעל אלמנטים נגללים
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'scale(1.1) rotate(120deg)' // אפקט סיבוב קטן ומגניב בהובר
          }
        }}
      >
        <SettingsIcon />
      </Fab>

      {/* הדיאלוג המוזרק */}
      <SettingsDialog open={isDialogOpen} onClose={handleClose} />
    </>
  );
};

export default SettingsBtn;