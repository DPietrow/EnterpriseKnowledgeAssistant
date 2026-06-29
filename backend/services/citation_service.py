class CitationService:

    @staticmethod
    def build(chunks):

        return [
            {
                "document": chunk["document_title"],
                "page": chunk["page_number"],
                "score": round(chunk["score"], 4)
            }
            for chunk in chunks
        ]