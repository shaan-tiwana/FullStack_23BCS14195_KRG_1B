from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
import os

# Globally accessible libraries
db = SQLAlchemy()
migrate = Migrate()

def create_app(config_class=Config):
    """Initialize the core application."""
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize Plugins
    db.init_app(app)
    migrate.init_app(app, db)
    
    # Enable CORS to allow your React frontend to make requests
    CORS(app, resources={r"/*": {"origins": "*"}}) 

    with app.app_context():
        # Include our Routes
        from . import routes

        app.register_blueprint(routes.bp)
        
        if not os.path.exists(app.config['UPLOAD_FOLDER']):
            os.makedirs(app.config['UPLOAD_FOLDER'])

        return app