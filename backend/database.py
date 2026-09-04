import os

# Database configuration for SQLite
DATABASE_PATH = os.path.join(os.path.dirname(__file__), 'fraudnova.db')
SQLALCHEMY_DATABASE_URI = f'sqlite:///{DATABASE_PATH}'
SQLALCHEMY_TRACK_MODIFICATIONS = False
