class PromptService:

    @staticmethod
    def build_context(chunks):

        pieces = []

        for chunk in chunks:

            if not chunk:
                continue

            content = chunk.get("content") or ""

            title = chunk.get("document_title") or "Unknown Document"
            filename = chunk.get("document_filename") or "Unknown File"
            page = chunk.get("page_number")

            pieces.append(f"""=== SOURCE {chunk.get('id')} ===
Title: {title}
File: {filename}
Page: {page}
Content:
{content}
=== END SOURCE ===""")

        return "\n\n".join(pieces)