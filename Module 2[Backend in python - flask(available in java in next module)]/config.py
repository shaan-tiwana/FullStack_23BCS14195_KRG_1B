import os
from dotenv import load_dotenv

# Find the absolute path of the root directory
basedir = os.path.abspath(os.path.dirname(__file__))
# Load the .env file from the root directory
load_dotenv(os.path.join(basedir, '.env'))

class Config:
    """Set Flask configuration variables from .env file."""
    
    SECRET_KEY = os.environ.get('SECRET_KEY')
    FLASK_APP = os.environ.get('FLASK_APP')

    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    UPLOAD_FOLDER = os.path.join(basedir, 'uploads')
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024 # 16 MB limit