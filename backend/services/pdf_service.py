class PdfService:

    @staticmethod
    def extract_metadata(filepath):
        import fitz  # PyMuPDF

        doc = fitz.open(filepath)

        return {
            "title": doc.metadata.get("title"),
            "page_count": len(doc)
        }

    @staticmethod
    def extract_pages(filepath):
        """
        Returns a list of pages with their page number and text.

        Example:
        [
            {
                "page_number": 1,
                "text": "Page one text..."
            },
            {
                "page_number": 2,
                "text": "Page two text..."
            }
        ]
        """
        import fitz  # PyMuPDF

        doc = fitz.open(filepath)

        pages = []

        for page_number, page in enumerate(doc, start=1):
            pages.append({
                "page_number": page_number,
                "text": page.get_text()
            })

        return pages