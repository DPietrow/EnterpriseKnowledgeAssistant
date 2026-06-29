class PromptService:

    @staticmethod
    def build_context(chunks):

        pieces = []

        for chunk in chunks:

            pieces.append(
f"""[SOURCE]
Document Title: {chunk["document_title"]}
Page Number: {chunk["page_number"]}
Chunk ID: {chunk["chunk_index"]}

Content:
{chunk["content"]}
"""
            )

        return "\n\n".join(pieces)