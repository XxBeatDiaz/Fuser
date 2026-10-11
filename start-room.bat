@echo off
title Escape Room Control System
echo Starting Room Services...

:: חילוץ כתובת ה-IP של המחשב ברשת המקומית
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4 Address" /c:"כתובת IPv4"') do (
  set IP=%%a
)
:: ניקוי רווחים מיותרים מהכתובת
set IP=%IP: =%

echo Detected Local IP: %IP%

:: 1. הרצת השרתים וה-MQTT ברקע דרך concurrently
start /min cmd /c "npm run dev"

:: 2. המתנה של 5 שניות לטעינת השרת
timeout /t 5 /nobreak >nul

:: 3. פתיחת ה-Frontend בדפדפן לפי כתובת ה-IP
start http://%IP%:5173

exit
