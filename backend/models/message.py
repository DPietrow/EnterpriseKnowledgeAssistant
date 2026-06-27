from datetime import datetime

from extensions import db


class Message(db.Model):
    __tablename__ = "messages"

    id = db.Column(db.Integer, primary_key=True)

    conversation_id = db.Column(
        db.Integer,
        db.ForeignKey("conversations.id", ondelete="CASCADE"),
        nullable=False,
    )

    role = db.Column(db.String(20), nullable=False)

    content = db.Column(db.Text, nullable=False)

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
    )

    conversation = db.relationship(
        "Conversation",
        back_populates="messages",
    )

    def __repr__(self):
        return f"<Message {self.role}>"