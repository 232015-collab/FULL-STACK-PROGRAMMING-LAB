@echo off
set ROOT=C:\Users\E-TIME\Downloads\SUNDAS MARIA HAYAT_232015_FSP  LAB 12
set EMPTY=%ROOT%\empty_temp
set LAB11A=%ROOT%\Lab_11_MERN_Stack_Node_MongoDB_Lab
set LAB11B=%ROOT%\SUNDAS MARIA HAYAT_232015_FSP  LAB 11

if not exist "%EMPTY%" mkdir "%EMPTY%"

echo Wiping Lab_11_MERN_Stack_Node_MongoDB_Lab...
robocopy "%EMPTY%" "%LAB11A%" /MIR >nul 2>&1
rd /s /q "%LAB11A%"

echo Wiping SUNDAS MARIA HAYAT_232015_FSP  LAB 11...
robocopy "%EMPTY%" "%LAB11B%" /MIR >nul 2>&1
rd /s /q "%LAB11B%"

echo Removing temp dir...
rd /s /q "%EMPTY%"

echo.
echo === Final Structure ===
dir /b "%ROOT%"
echo Done!
