@echo off
REM Run the Flask backend (Windows)
cd /d "%~dp0backend"
if not exist venv (
  echo Creating Python virtual environment...
  python -m venv venv
)
call venv\Scripts\activate
pip install -r requirements.txt
python app.py