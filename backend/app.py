from dotenv import load_dotenv
from flask_cors import CORS
load_dotenv()

import os
from flask import Flask, request
from extensions import db, migrate

def create_app():
    print("🚀 Flask factory starting...")

    app = Flask(__name__)

    @app.before_request
    def debug():
        print("➡️", request.method, request.path)
        
    CORS(
        app,
        resources={r"/api/*": {
            "origins": [
                "https://apollo-assistant.com",
                "https://www.apollo-assistant.com"
            ]
        }},
        supports_credentials=False,
        allow_headers=["Content-Type", "Authorization"],
        methods=["GET", "POST", "OPTIONS"]
    )

    db_url = os.getenv("DATABASE_URL")
    print("ENV DATABASE_URL:", bool(db_url))
    print("ENV PORT:", os.getenv("PORT"))

    if not db_url:
        raise Exception("DATABASE_URL is missing")

    if db_url.startswith("postgres://"):
        db_url = db_url.replace("postgres://", "postgresql+psycopg2://", 1)

    app.config["SQLALCHEMY_DATABASE_URI"] = db_url
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["UPLOAD_FOLDER"] = os.path.join("/tmp", "uploads")
    os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

    db.init_app(app)
    migrate.init_app(app, db)

    print("🔥 BEFORE IMPORT document_routes")
    from routes.document_routes import document_bp
    print("🔥 AFTER IMPORT document_routes")

    app.register_blueprint(document_bp, url_prefix="/api/documents")

    @app.route("/")
    def health():
        return {"status": "ok"}, 200

    @app.route("/health")
    def health_check():
        return "healthy", 200
    
    @app.route("/api/debug-options", methods=["OPTIONS"])
    def debug_options():
        return "ok", 200

    print("✅ App created")
    return app


app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 5000)))