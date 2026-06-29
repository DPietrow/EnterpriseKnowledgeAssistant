from dotenv import load_dotenv
load_dotenv()

import os
from flask import Flask
from extensions import db, migrate   # 👈 IMPORTANT

def create_app():
    print("🚀 Flask starting...")

    app = Flask(__name__)

    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        raise Exception("DATABASE_URL is missing")

    if db_url.startswith("postgres://"):
        db_url = db_url.replace("postgres://", "postgresql+psycopg2://", 1)

    app.config["SQLALCHEMY_DATABASE_URI"] = db_url
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)

    # THIS IS THE FIX
    migrate.init_app(app, db)

    from routes.document_routes import document_bp
    app.register_blueprint(document_bp, url_prefix="/api/documents")

    return app

app = create_app()