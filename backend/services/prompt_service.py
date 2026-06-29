class PromptService:

    @staticmethod
    def build_context(chunks):

        pieces = []

        for chunk in chunks:

            pieces.append(
                f"""
📄 Document: {chunk["document_title"]}
📄 File: {chunk.get("document_filename", "Unknown file")}
📍 Page: {chunk["page_number"]}

{chunk["content"]}
"""
            )

        return "\n\n---\n\n".join(pieces)