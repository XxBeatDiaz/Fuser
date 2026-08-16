import { Box, Typography, Button, Paper } from '@mui/material';
import { Link } from 'react-router';

const NotFoundPage = () => {
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '70vh',
      p: 3 
    }}>
      <Paper elevation={4} sx={{ 
        p: 5, 
        textAlign: 'center', 
        maxWidth: 500, 
        borderRadius: 4,
        border: '2px dashed #d32f2f',
        backgroundColor: '#fffdfd'
      }}>
        
        {/* המשפט הנבחר */}
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: '#2c3e50' }}>
          לאן אתה חושב שהגעת בדיוק? 🤔
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', fontStyle: 'italic' }}>
          הקבוצה בחדר אולי הולכת לאיבוד, אבל זה לא אומר שגם המפעיל צריך. <br />
          הנתיב הזה לא קיים בקוד שלנו, כנראה שמישהו פה לחץ על כפתור לא נכון...
        </Typography>
        
        {/* כפתור מילוט */}
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          component={Link} 
          to="/"
          sx={{ 
            borderRadius: 2,
            px: 4,
            fontWeight: 'bold',
            boxShadow: '0px 4px 10px rgba(25, 118, 210, 0.3)'
          }}
        >
          קח אותי חזרה לחמ"ל האמיתי
        </Button>
      </Paper>
    </Box>
  );
};

export default NotFoundPage;