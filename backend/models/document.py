from datetime import datetime

from extensions import db


class Document(db.Model):
    __tablename__ = "documents"

    id = db.Column(db.Integer, primary_key=True)

    filename = db.Column(db.String(255), nullable=False)

    filepath = db.Column(db.String(500), nullable=False)

    title = db.Column(db.String(255))

    page_count = db.Column(db.Integer)

    chunk_count = db.Column(db.Integer, default=0)

    # --------------------------
    # JOB STATE
    # --------------------------

    status = db.Column(
        db.String(30),
        nullable=False,
        default="queued",
        server_default="queued"
    )

    stage = db.Column(
        db.String(30),
        nullable=False,
        default="queued"
    )

    stage_order = db.Column(db.Integer, nullable=False, default=0)


    error_message = db.Column(
        db.Text
    )

    uploaded_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    started_at = db.Column(
        db.DateTime
    )

    finished_at = db.Column(
        db.DateTime
    )

    # --------------------------

    chunks = db.relationship(
        "Chunk",
        back_populates="document",
        cascade="all, delete-orphan",
    )

    def __repr__(self):
        return f"<Document {self.filename}>"