import os
import uuid
import traceback

from werkzeug.utils import secure_filename

from services.embedding_service import EmbeddingService
from services.chunking_service import ChunkingService
from services.pdf_service import PdfService

from extensions import db
from models.document import Document
from models.chunk import Chunk


class DocumentService:

    @staticmethod
    def save_uploaded_file(file, upload_folder):

        filename = secure_filename(file.filename)
        extension = os.path.splitext(filename)[1]

        stored_filename = f"{uuid.uuid4()}{extension}"

        os.makedirs(upload_folder, exist_ok=True)

        filepath = os.path.join(upload_folder, stored_filename)
        file.save(filepath)

        # ---------------------------
        # 1. Create document record
        # ---------------------------
        document = Document(
            filename=filename,
            filepath=filepath,
            status="processing"
        )

        db.session.add(document)
        db.session.commit()

        try:

            # ---------------------------
            # 2. Extract metadata
            # ---------------------------
            pdf_data = PdfService.extract_metadata(filepath)

            document.page_count = pdf_data.get("page_count")
            document.title = pdf_data.get("title")

            # ---------------------------
            # 3. Extract pages
            # ---------------------------
            pages = PdfService.extract_pages(filepath)

            print(f"Extracted {len(pages)} pages")

            chunk_models = []
            total_chunks = 0

            # ---------------------------
            # 4. Chunk each page
            # ---------------------------
            next_chunk_index = 0
            for page in pages:

                page_number = page["page_number"]
                page_text = page["text"]

                print(
                    f"Page {page_number}: {len(page_text)} characters"
                )

                chunks = ChunkingService.chunk_text(
                    page_text,
                    start_index=next_chunk_index
                )

                for chunk_data in chunks:

                    try:

                        embedding = EmbeddingService.embed_text(
                            chunk_data["content"]
                        )

                        chunk_models.append(
                            Chunk(
                                document_id=document.id,
                                page_number=page_number,
                                chunk_index=chunk_data["chunk_index"],
                                content=chunk_data["content"],
                                embedding=embedding
                            )
                        )

                        total_chunks += 1
                        next_chunk_index += len(chunks)

                    except Exception as e:

                        print(
                            f"Embedding failed for page {page_number}, "
                            f"chunk {chunk_data['chunk_index']}: {e}"
                        )

                        continue

            # ---------------------------
            # 5. Save chunks
            # ---------------------------
            db.session.add_all(chunk_models)

            document.chunk_count = total_chunks
            document.status = "indexed"

            db.session.commit()

            print(f"Indexed {total_chunks} chunks.")

            return document

        except Exception as e:

            db.session.rollback()

            document.status = "failed"

            db.session.add(document)
            db.session.commit()

            print("Document processing failed:")
            print(traceback.format_exc())

            raise e