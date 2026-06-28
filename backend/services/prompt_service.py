class PromptService:

    @staticmethod
    def build_context(chunks):

        pieces = []

        for chunk in chunks:

            pieces.append(
                f"""
Document:
{chunk["document_title"]}

Page:
{chunk["page_number"]}

Content:
{chunk["content"]}
"""
            )

        return "\n\n".join(pieces)