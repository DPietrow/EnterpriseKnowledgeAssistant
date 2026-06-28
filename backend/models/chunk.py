from pgvector.sqlalchemy import Vector

from extensions import db


class Chunk(db.Model):
    __tablename__ = "chunks"

    id = db.Column(db.Integer, primary_key=True)

    document_id = db.Column(
        db.Integer,
        db.ForeignKey("documents.id", ondelete="CASCADE"),
        nullable=False,
    )

    page_number = db.Column(db.Integer)

    chunk_index = db.Column(db.Integer)

    content = db.Column(db.Text, nullable=False)

    embedding = db.Column(Vector(384))

    document = db.relationship(
        "Document",
        back_populates="chunks",
    )

    def __repr__(self):
        return f"<Chunk {self.id}>"