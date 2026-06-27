from datetime import datetime

from extensions import db


class Document(db.Model):
    __tablename__ = "documents"

    id = db.Column(db.Integer, primary_key=True)

    filename = db.Column(db.String(255), nullable=False)

    title = db.Column(db.String(255))

    page_count = db.Column(db.Integer)

    chunk_count = db.Column(db.Integer, default=0)

    status = db.Column(db.String(30), default="uploaded")

    uploaded_at = db.Column(db.DateTime, default=datetime.utcnow)

    chunks = db.relationship(
        "Chunk",
        back_populates="document",
        cascade="all, delete-orphan",
    )

    def __repr__(self):
        return f"<Document {self.filename}>"