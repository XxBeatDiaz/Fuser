import { useState, useEffect } from "react";
import { Fab, Zoom } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export const ScrollToTopBtn = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Zoom in={show}>
      <Fab
        color="primary"
        size="medium"
        onClick={handleScrollToTop}
        aria-label="scroll back to top"
        sx={{
          position: "fixed",
          bottom: 24,
          left: 24,
          zIndex: 1200,
          boxShadow: "0px 4px 20px rgba(0, 229, 255, 0.4)",
          "&:hover": {
            backgroundColor: "#00B8D4",
          },
        }}
      >
        <KeyboardArrowUpIcon sx={{ color: "#0A0E17", fontWeight: "bold" }} />
      </Fab>
    </Zoom>
  );
};

export default ScrollToTopBtn;
