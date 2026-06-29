from time import sleep

from models.document import Document
from services.document_service import DocumentService
from services.worker_service import run_worker

while True:

    queued = (
        Document.query
        .filter_by(status="queued")
        .first()
    )

    if queued:

        DocumentService.index(queued.id)

    else:

        sleep(2)