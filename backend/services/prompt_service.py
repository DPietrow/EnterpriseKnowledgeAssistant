class PromptService:

    @staticmethod
    def build_context(chunks):

        pieces = []

        for chunk in chunks:

            pieces.append(
f"""SOURCE:
Title: {chunk["document_title"]}
File: {chunk.get("document_filename")}
Page: {chunk["page_number"]}

TEXT:
{chunk["content"]}
"""
            )

        return "\n\n".join(pieces)