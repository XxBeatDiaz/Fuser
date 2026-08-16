import { Button } from '@mui/material';

export const ControlButton = ({ children, variant = 'contained', sx = {}, ...props }) => {
  return (
    <Button
      variant={variant}
      {...props}
      sx={{
        minWidth: '40px', // הופך את הכפתור לריבועי/עגול וקומפקטי עבור האייקון
        height: '40px',
        p: 0,
        borderRadius: 2,
        ...sx
      }}
    >
      {children}
    </Button>
  );
};

export default ControlButton;