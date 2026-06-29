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
    def chunk_text(text, start_index=0):

        #  HARD GUARD: ensure string input
        if isinstance(text, list):
            text = " ".join(text)

        if not isinstance(text, str):
            text = str(text)

        text = ChunkingService.clean_text(text)

        chunks = []
        words = text.split()
        chunk_size = 200

        for i in range(0, len(words), chunk_size):

            chunk = " ".join(words[i:i + chunk_size])

            chunks.append({
                "chunk_index": start_index + len(chunks),
                "content": chunk
            })

        return chunks