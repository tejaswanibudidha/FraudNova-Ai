@echo off
REM Run the Flask backend (Windows)
cd backend
if not exist venv (
  python -m venv venv
)
call venv\Scripts\activate
pip install -r requirements.txt
python app.py