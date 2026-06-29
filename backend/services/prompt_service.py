class PromptService:

    @staticmethod
    def build_context(chunks):

        pieces = []

        for chunk in chunks:

            pieces.append(
                f"""=== SOURCE ===
                Title: {chunk["document_title"]}
                File: {chunk.get("document_filename", "Unknown")}
                Page: {chunk["page_number"]}
                
                Content:
                {chunk["content"]}
                === END SOURCE ==="""
            )

        return "\n\n".join(pieces)