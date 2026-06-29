class CitationService:

    @staticmethod
    def build(chunks):

        citations = []

        for c in chunks:

            title = c.get("document_title") or c.get("document_filename")

            if not title:
                title = "Unknown Document"

            citations.append({
                "title": title,
                "filename": c.get("document_filename"),
                "page": c.get("page_number"),
                "score": round(c.get("score", 0), 4)
            })

        return citations