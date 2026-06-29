from datetime import datetime, timezone
import os
import uuid
import time

from werkzeug.utils import secure_filename

from services.embedding_service import EmbeddingService
from services.chunking_service import ChunkingService
from services.pdf_service import PdfService
from extensions import db
from models.document import Document
from models.chunk import Chunk


class DocumentService:

    # =========================================================
    # MAIN PIPELINE (PRODUCTION SAFE)
    # =========================================================
    @staticmethod
    def index(document_id):
        try:
            print("\n==============================")
            print("[PIPELINE STARTED]")
            print(f"document_id = {document_id}")
            print("==============================\n")
            start = time.time()

            print("\n============================================================")
            print(f"[INDEX START] document_id={document_id}")
            print("============================================================")

            # -------------------------
            # LOAD DOCUMENT
            # -------------------------
            print("[STEP] loading document")
            document = Document.query.get(document_id)
            if not document:
                print("[ERROR] document not found")
                return

            print(f"[OK] loaded: {document.filename}")

            # -------------------------
            # EXTRACT PAGES
            # -------------------------
            print("[STEP] extracting pages")
            print("[TRACE] extracting")
            DocumentService.update_status(document, "extracting")
            pages = PdfService.extract_pages(document.filepath)
            print(f"[OK] pages: {len(pages)}")

            # -------------------------
            # CHUNK TEXT
            # -------------------------
            print("[STEP] chunking")
            print("[TRACE] chunking")
            DocumentService.update_status(document, "chunking")
            texts = []
            metadata = []
            chunk_counter = 0

            for page in pages:

                print(f"[PAGE] {page['page_number']}")

                page_chunks = ChunkingService.chunk_text(
                    page["text"],
                    start_index=chunk_counter
                )

                print(f"[CHUNKS] {len(page_chunks)}")

                for c in page_chunks:
                    texts.append(c["content"])
                    metadata.append({
                        "page_number": page["page_number"],
                        "chunk_index": c["chunk_index"]
                    })

                chunk_counter += len(page_chunks)

            print(f"[OK] total chunks: {len(texts)}")

            # -------------------------
            # EMBEDDING (BATCH)
            # -------------------------
            print("[STEP] embedding batch start")
            embed_start = time.time()
            print("[TRACE] embedding")
            DocumentService.update_status(document, "embedding")
            embeddings = EmbeddingService.embed_batch(texts)

            print(f"[OK] embeddings done in {time.time() - embed_start:.2f}s")

            # -------------------------
            # BUILD DB OBJECTS
            # -------------------------
            print("[STEP] building DB rows")
            print("[TRACE] storing")
            DocumentService.update_status(document, "storing")

            chunk_models = []

            for i, emb in enumerate(embeddings):

                meta = metadata[i]

                chunk_models.append(
                    Chunk(
                        document_id=document.id,
                        page_number=meta["page_number"],
                        chunk_index=meta["chunk_index"],
                        content=texts[i],
                        embedding=emb
                    )
                )

                if i % 25 == 0:
                    print(f"[DB] prepared {i}/{len(embeddings)}")

            # -------------------------
            # DB WRITE
            # -------------------------
            print("[STEP] committing to database")
            db.session.add_all(chunk_models)

            document.chunk_count = len(chunk_models)
            DocumentService.update_status(
                document,
                "completed"
            )

            print("[OK] DB commit complete")

            # -------------------------
            # DONE
            # -------------------------
            total = time.time() - start

            print("\n============================================================")
            print(f"[INDEX COMPLETE] {document.filename}")
            print(f"[TIME] {total:.2f}s")
            print(f"[CHUNKS] {len(chunk_models)}")
            print("============================================================\n")
            print("\n==============================")
            print("[PIPELINE COMPLETE]")
            print(f"document_id = {document_id}")
            print("==============================\n")
        except Exception as e:
            document.error_message = str(e)

            DocumentService.update_status(
                document,
                "failed"
            )

            raise

    # =========================================================
    # FILE UPLOAD (CLEAN SINGLE PATH)
    # =========================================================
    @staticmethod
    def save_uploaded_file(file, upload_folder):

        print("[UPLOAD] saving file")

        filename = secure_filename(file.filename)
        ext = os.path.splitext(filename)[1]

        stored_filename = f"{uuid.uuid4()}{ext}"
        filepath = os.path.join(upload_folder, stored_filename)

        os.makedirs(upload_folder, exist_ok=True)
        file.save(filepath)

        print(f"[UPLOAD] saved to {filepath}")

        document = Document(
            filename=filename,
            title = filename.replace(".pdf", ""),
            filepath=filepath,
            status="queued",
            stage="queued"
        )

        db.session.add(document)
        db.session.commit()

        print(f"[UPLOAD] document created id={document.id}")

        return document

    # =========================================================
    # BATCH EMBED HELPER (USED BY PIPELINE)
    # =========================================================
    @staticmethod
    def embed_and_store(document, chunks):

        print("[EMBED] batch embedding")

        texts = [c["content"] for c in chunks]

        embeddings = EmbeddingService.embed_batch(texts)

        models = []

        for i, c in enumerate(chunks):

            models.append(
                Chunk(
                    document_id=document.id,
                    page_number=c.get("page_number", 0),
                    chunk_index=c.get("chunk_index", 0),
                    content=c["content"],
                    embedding=embeddings[i]
                )
            )

        db.session.add_all(models)
        db.session.commit()

        print(f"[EMBED] stored {len(models)} chunks")

        return models
    
    @staticmethod
    def save_uploaded_file_from_path(temp_path, original_filename, upload_folder):

        filename = secure_filename(original_filename)
        extension = os.path.splitext(filename)[1]

        stored_filename = f"{uuid.uuid4()}{extension}"
        final_path = os.path.join(upload_folder, stored_filename)

        os.makedirs(upload_folder, exist_ok=True)

        os.rename(temp_path, final_path)

        document = Document(
            filename=filename,
            filepath=final_path,
            status="queued",
            stage="queued"
        )

        db.session.add(document)
        db.session.commit()

        print(f"[UPLOAD] saved from temp path → {final_path}")
        print(f"[UPLOAD] document created id={document.id}")

        return document
    
    @staticmethod
    def update_status(document, stage):
        STAGE_ORDER = {
            "queued": 0,
            "extracting": 1,
            "chunking": 2,
            "embedding": 3,
            "storing": 4,
            "completed": 5,
            "failed": 99,
        }
        document.stage_order = STAGE_ORDER.get(stage, 0)
        document.stage = stage
    
        if stage == "queued":
            document.status = "queued"
    
        elif stage in (
            "extracting",
            "chunking",
            "embedding",
            "storing",
        ):
            document.status = "running"
    
            if document.started_at is None:
                document.started_at = datetime.now(timezone.utc)
    
        elif stage in ("completed", "indexed"):
            document.status = "completed"
            document.finished_at = datetime.now(timezone.utc)
    
        elif stage == "failed":
            document.status = "failed"
            document.finished_at = datetime.now(timezone.utc)
    
        db.session.commit()
    
        print(f"[STATUS] {document.status} :: {document.stage}")