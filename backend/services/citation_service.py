class CitationService:

    @staticmethod
    def build(chunks):

        return [
            {
                "title": chunk["document_title"],
                "filename": chunk.get("document_filename"),
                "page": chunk["page_number"],
                "score": round(chunk["score"], 4)
            }
            for chunk in chunks
        ]