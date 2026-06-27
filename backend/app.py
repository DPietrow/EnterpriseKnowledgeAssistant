from flask import Flask
from sqlalchemy import text

from config import Config
from extensions import db

# Import models so SQLAlchemy registers them
from models.document import Document
from models.chunk import Chunk
from models.conversation import Conversation
from models.message import Message


def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    db.init_app(app)

    with app.app_context():
        db.create_all()
        print("Database connected and tables created!")

    return app


app = create_app()


if __name__ == "__main__":
    app.run(debug=True)