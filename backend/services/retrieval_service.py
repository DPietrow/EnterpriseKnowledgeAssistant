from services.embedding_service import EmbeddingService
from models.chunk import Chunk
from models.document import Document
from extensions import db


class RetrievalService:

    @staticmethod
    def search(query, limit=5):
        query_embedding = EmbeddingService.embed_text(query)

        results = (
            db.session.query(
                Chunk,
                Document.title,
                Document.filename,
                Chunk.embedding.cosine_distance(query_embedding).label("score")
            )
            .join(Document, Chunk.document_id == Document.id)
            .order_by(
                Chunk.embedding.cosine_distance(query_embedding)
            )
            .limit(limit)
            .all()
        )

        return [
            {
                "content": chunk.content,
                "page_number": chunk.page_number,
                "document_title": title,
                "document_filename": filename,
                "score": float(score)
            }
            for chunk, title, filename, score in results
        ]