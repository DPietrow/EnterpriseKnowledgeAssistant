from dotenv import load_dotenv
from flask_cors import CORS
load_dotenv()

import os
from flask import Flask
from extensions import db, migrate

def create_app():
    print("🚀 Flask factory starting...")

    app = Flask(__name__)
    CORS(app)
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
    print("🔥 BEFORE IMPORT document_routes")
    from routes.document_routes import document_bp
    print("🔥 AFTER IMPORT document_routes")
    app.register_blueprint(document_bp, url_prefix="/api/documents")

    print("✅ App created")
    return app


app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 5000)))

@app.route("/")
def health():
    return {"status": "ok", "message": "API running"}, 200

@app.route("/health")
def health_check():
    return "healthy", 200