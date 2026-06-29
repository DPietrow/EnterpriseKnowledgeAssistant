from dotenv import load_dotenv
load_dotenv()

import os
import sys
from flask import Flask
from extensions import db, migrate

def create_app():

    print("🚀 Flask factory starting...", flush=True)
    print("ENV DATABASE_URL:", os.getenv("DATABASE_URL"), flush=True)
    print("ENV PORT:", os.getenv("PORT"), flush=True)

    app = Flask(__name__)

    db_url = os.getenv("DATABASE_URL")

    if not db_url:
        print("❌ DATABASE_URL missing", file=sys.stderr, flush=True)
        raise Exception("DATABASE_URL is missing")

    if db_url.startswith("postgres://"):
        db_url = db_url.replace("postgres://", "postgresql+psycopg2://", 1)

    app.config["SQLALCHEMY_DATABASE_URI"] = db_url
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)
    migrate.init_app(app, db)
    print("✅ DB initialized", flush=True)

    from routes.document_routes import document_bp
    app.register_blueprint(document_bp, url_prefix="/api/documents")

    print("✅ Blueprints registered", flush=True)

    return app


app = create_app()

print("🚀 App object created", flush=True)

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    print(f"🚀 Running on port {port}", flush=True)
    app.run(host="0.0.0.0", port=port, debug=True)