class CitationService:

    @staticmethod
    def build(chunks):

        return [
            {
                "title": chunk.get("document_title", "Unknown Document"),
                "filename": chunk.get("document_filename", ""),
                "page": chunk.get("page_number"),
                "score": round(chunk.get("score", 0), 4) if chunk.get("score") is not None else None
            }
            for chunk in chunks
        ]