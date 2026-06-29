from dotenv import load_dotenv
load_dotenv()

import os
from flask import Flask
from extensions import db, migrate

def create_app():
    print("🚀 Flask factory starting...")

    app = Flask(__name__)

    db_url = os.getenv("DATABASE_URL")
    print("ENV DATABASE_URL:", bool(db_url))
    print("ENV PORT:", os.getenv("PORT"))

    if not db_url:
        raise Exception("DATABASE_URL is missing")

    if db_url.startswith("postgres://"):
        db_url = db_url.replace("postgres://", "postgresql+psycopg2://", 1)

    app.config["SQLALCHEMY_DATABASE_URI"] = db_url
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)
    migrate.init_app(app, db)
    from routes.document_routes import document_bp
    app.register_blueprint(document_bp, url_prefix="/api/documents")

    print("✅ App created")
    return app


app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 5000)))