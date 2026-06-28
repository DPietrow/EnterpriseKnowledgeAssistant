import uuid
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func

from extensions import db


class Job(db.Model):
    __tablename__ = "jobs"

    id = db.Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    document_id = db.Column(
        db.Integer,
        db.ForeignKey("documents.id"),
        nullable=False,
    )

    status = db.Column(
        db.String(30),
        nullable=False,
        default="queued",
    )

    stage = db.Column(
        db.String(50),
        nullable=False,
        default="queued",
    )

    created_at = db.Column(
        db.DateTime(timezone=True),
        server_default=func.now(),
    )

    started_at = db.Column(
        db.DateTime(timezone=True),
        nullable=True,
    )

    finished_at = db.Column(
        db.DateTime(timezone=True),
        nullable=True,
    )