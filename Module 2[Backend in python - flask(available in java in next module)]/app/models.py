from app import db
from datetime import datetime
import string
import random

def generate_share_code():
    """Generates a unique 6-character code."""
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))

class File(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    original_filename = db.Column(db.String(255), nullable=False)
    unique_filename = db.Column(db.String(255), unique=True, nullable=False)
    share_code = db.Column(db.String(6), unique=True, nullable=False, default=generate_share_code)
    upload_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    
    def __repr__(self):
        return f'<File {self.original_filename}>'