print("=" * 60)
print("APP STARTED")
print("=" * 60)

from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from extensions import db
from config import Config

import models

migrate = Migrate()

def create_app():
    print("create_app called")
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(
        app,
        origins=[
            "http://localhost:5173",
            "http://127.0.0.1:5173"
        ]
    )
    db.init_app(app)
    migrate.init_app(app, db)

    # force model registration 
    from models import Document, Chunk, Conversation, Message


    from routes.document_routes import document_bp
    app.register_blueprint(document_bp, url_prefix="/api/documents")

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)