"""populate document titles

Revision ID: 2b6a3c952bf3
Revises: dcb8a0daf83e
Create Date: 2026-06-29 11:31:29.498596

"""
import os

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2b6a3c952bf3'
down_revision = 'dcb8a0daf83e'
branch_labels = None
depends_on = None


def upgrade():
    connection = op.get_bind()

    rows = connection.execute(
        sa.text("""
            SELECT id, filename
            FROM documents
            WHERE title IS NULL
               OR title = 'Unknown Document'
        """)
    )

    for row in rows:
        title = os.path.splitext(row.filename)[0]

        connection.execute(
            sa.text("""
                UPDATE documents
                SET title = :title
                WHERE id = :id
            """),
            {
                "title": title,
                "id": row.id,
            },
        )


def downgrade():
    pass
