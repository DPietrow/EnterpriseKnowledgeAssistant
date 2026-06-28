import time

from extensions import db
from models.document import Document
from services.document_service import DocumentService


def run_worker():

    print("===================================")
    print("BACKGROUND WORKER STARTED")
    print("===================================")

    while True:

        document = (
            Document.query
            .filter_by(status="queued")
            .order_by(Document.id.asc())
            .first()
        )

        if document is None:
            time.sleep(1)
            continue

        try:

            print(f"[WORKER] indexing document {document.id}")

            document.status = "processing"
            db.session.commit()

            DocumentService.index(document.id)

            document.status = "indexed"
            db.session.commit()

            print(f"[WORKER] complete {document.id}")

        except Exception as ex:

            print(ex)

            document.status = "failed"
            db.session.commit()