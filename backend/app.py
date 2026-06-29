from dotenv import load_dotenv
load_dotenv()

import os
from flask import Flask
from extensions import db, migrate

def create_app():

    app = Flask(__name__)

    db_url = os.getenv("DATABASE_URL")

    if not db_url:
        raise Exception("DATABASE_URL is missing")

    # Normalize Render Postgres URL
    if db_url.startswith("postgres://"):
        db_url = db_url.replace("postgres://", "postgresql+psycopg2://", 1)

    if db_url.startswith("postgresql://"):
        db_url = db_url.replace("postgresql://", "postgresql+psycopg2://", 1)

    app.config["SQLALCHEMY_DATABASE_URI"] = db_url
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # init db FIRST
    db.init_app(app)

    # init migrate ONCE (from extensions)
    migrate.init_app(app, db)

    # routes
    from routes.document_routes import document_bp
    app.register_blueprint(document_bp, url_prefix="/api/documents")

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True)