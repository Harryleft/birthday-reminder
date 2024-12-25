@echo off
setlocal EnableDelayedExpansion

:: Save the current directory
set "SCRIPT_DIR=%~dp0"

:: Create logs directory if not exists
if not exist "%SCRIPT_DIR%logs" (
    mkdir "%SCRIPT_DIR%logs"
)

:: Set log file path with timestamp
set "LOG_FILE=%SCRIPT_DIR%logs\startup.log"

:: Function to log messages
call :log "=== Starting Application ==="
call :log "Current script directory: %SCRIPT_DIR%"

cd /d "%SCRIPT_DIR%"
call :log "Current directory after cd: %CD%"

echo Starting Birthday Alert Application...

:: Create virtual environment if not exists
if not exist ".venv" (
    echo Creating Python virtual environment...
    call :log "Creating Python virtual environment..."
    python -m venv .venv || (
        call :log "ERROR: Failed to create virtual environment"
        pause
        exit /b 1
    )
)

:: Activate virtual environment
call .venv\Scripts\activate
call :log "Virtual environment activated"

:: Install dependencies
echo Installing Python dependencies...
:: pip install -r requirements.txt

:: Start backend service
echo Starting backend service...
call :log "Starting backend service..."
start "Backend Service" python main.py
:: timeout /t 5

:: Enter frontend directory
call :log "Attempting to enter frontend directory: %SCRIPT_DIR%frontend"
cd "%SCRIPT_DIR%frontend" || (
    call :log "ERROR: Failed to enter frontend directory"
    pause
    exit /b 10
)
timeout /t 5

call :log "Current directory after cd to frontend: %CD%"
if exist "package.json" (
    echo Found package.json
    call :log "Found package.json"
) else (
    call :log "ERROR: package.json not found in %CD%"
    pause
    exit /b 1
)
timeout /t 5



:: Start frontend development server
echo Starting frontend service...
call :log "Starting frontend service..."
start "Frontend Service" npm run dev || (
    call :log "ERROR: Failed to start frontend service"
    pause
    timeout /t 5
    exit /b 1
)
call :log "Frontend service started"

timeout /t 5
echo Service started! Please visit:
echo Frontend: http://localhost:3000
echo Backend: http://localhost:5000
echo Press any key to exit...
call :log "=== Application startup completed ==="

pause
endlocal
goto :eof

:log
echo %~1
set "timestamp=%date:~0,4%-%date:~5,2%-%date:~8,2% %time:~0,2%:%time:~3,2%:%time:~6,2%"
echo %timestamp% - %~1 >> "%LOG_FILE%"
goto :eof 
