from services.embedding_service import EmbeddingService
from models.chunk import Chunk
from extensions import db


class RetrievalService:

    @staticmethod
    def search(query, limit=5):
        query_embedding = EmbeddingService.embed_text(query)

        results = (
            db.session.query(
                Chunk,
                Chunk.embedding.cosine_distance(query_embedding).label("score")
            )
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
                "document_title": chunk.document.title,
                "document_filename": chunk.document.filename,
                "score": float(score)
            }
            for chunk, score in results
        ]