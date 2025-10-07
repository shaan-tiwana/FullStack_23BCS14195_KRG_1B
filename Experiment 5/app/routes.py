from flask import Blueprint, request, jsonify, send_from_directory, current_app
from app.services import save_file, get_file_by_code
import os

# All routes will be prefixed with nothing, e.g., /upload
bp = Blueprint('main', __name__)

@bp.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No file selected for uploading'}), 400
    
    if file:
        try:
            file_record = save_file(file)
            return jsonify({
                'message': 'File uploaded successfully',
                'code': file_record.share_code,
                'link': f'http://127.0.0.1:5000/retrieve/{file_record.share_code}'
            }), 201
        except Exception as e:
            print(e)
            return jsonify({'error': 'An internal error occurred during file upload'}), 500
    
    return jsonify({'error': 'Unknown error during file upload'}), 500

@bp.route('/check/<code>', methods=['GET'])
def check_file(code):
    """Checks if a file exists without downloading it."""
    file_record = get_file_by_code(code.upper())
    if not file_record:
        return jsonify({'error': 'Share code not found'}), 404
    
    return jsonify({'message': 'File exists'}), 200

@bp.route('/retrieve/<code>', methods=['GET'])
def retrieve_file(code):
    """Downloads the file."""
    file_record = get_file_by_code(code.upper())
    if not file_record:
        return jsonify({'error': 'File not found with this code'}), 404
        
    return send_from_directory(
        directory=current_app.config['UPLOAD_FOLDER'],
        path=file_record.unique_filename,
        as_attachment=True,
        download_name=file_record.original_filename
    )