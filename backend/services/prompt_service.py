class PromptService:

    @staticmethod
    def build_context(chunks):

        pieces = []

        for i, chunk in enumerate(chunks or []):

            if not chunk:
                continue

            content = chunk.get("content") or ""

            title = chunk.get("document_title") or "Unknown Document"
            filename = chunk.get("document_filename") or "Unknown File"

            page = chunk.get("page_number")
            page = str(page) if page is not None else "Unknown"

            chunk_id = chunk.get("chunk_id") or f"chunk_{i}"

            pieces.append(f"""=== SOURCE {chunk_id} ===
Title: {title}
File: {filename}
Page: {page}

Content:
{content}
=== END SOURCE ===""")

        return "\n\n".join(pieces)