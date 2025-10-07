from werkzeug.utils import secure_filename
from app.models import File
from app import db
import uuid
import os
from flask import current_app

def save_file(file_storage):
    """
    Saves a file to the filesystem and creates a corresponding database record.
    Returns the new File object.
    """
    original_filename = secure_filename(file_storage.filename)
    
    # Generate unique filename using UUID to prevent same filename probelms
    ext = ''
    if '.' in original_filename:
        ext = original_filename.rsplit('.', 1)[1].lower()
    
    unique_filename = f"{uuid.uuid4()}.{ext}" if ext else str(uuid.uuid4())
    
    file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], unique_filename)
    file_storage.save(file_path)
    
    # Create database record
    new_file = File(
        original_filename=original_filename,
        unique_filename=unique_filename
    )
    db.session.add(new_file)
    db.session.commit()
    
    return new_file

def get_file_by_code(share_code):
    """Retrieves a file record from the database by its share code."""
    return File.query.filter_by(share_code=share_code).first()