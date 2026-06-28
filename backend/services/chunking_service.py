import re


class ChunkingService:

    @staticmethod
    def clean_text(text: str) -> str:
        """
        Basic cleanup for PDF extraction artifacts.
        """
        text = text.replace("\n", " ")
        text = re.sub(r"\s+", " ", text)
        return text.strip()

    @staticmethod
    def chunk_text(
        text: str,
        chunk_size: int = 800,
        overlap: int = 100,
        start_index: int = 0
    ):
        """
        Splits text into overlapping chunks.

        start_index allows chunk numbering to continue across pages.
        """

        text = ChunkingService.clean_text(text)

        chunks = []

        start = 0
        chunk_index = start_index

        while start < len(text):

            end = start + chunk_size

            chunks.append({
                "chunk_index": chunk_index,
                "content": text[start:end]
            })

            chunk_index += 1
            start = end - overlap

            if start < 0:
                start = 0

        return chunks