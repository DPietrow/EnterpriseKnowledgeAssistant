from services.retrieval_service import RetrievalService
from services.prompt_service import PromptService
from services.llm_service import LLMService
from services.citation_service import CitationService
from services.events import TokenEvent, CitationEvent


class RAGOrchestrator:

    @staticmethod
    def stream(question, context, chunks):

        # -------------------------
        # 1. Retrieval stage
        # -------------------------
        yield {"type": "lifecycle", "stage": "retrieval_start"}

        # chunks already passed in, so we just simulate lifecycle
        yield {"type": "lifecycle", "stage": "retrieval_done"}

        # -------------------------
        # 2. Prompt stage
        # -------------------------
        yield {"type": "lifecycle", "stage": "prompt_ready"}

        # -------------------------
        # 3. LLM streaming
        # -------------------------
        buffer = ""   
        for token in LLMService.stream_generate(question, context):
        
            if not token:
                continue
            
            buffer += token

            # flush on punctuation or space threshold
            if len(buffer) > 6 or token.endswith((" ", ".", ",", "!", "?")):
                yield TokenEvent(buffer)
                buffer = ""

        # flush remainder
        if buffer:
            yield TokenEvent(buffer)

        # -------------------------
        # 4. Citations
        # -------------------------
        citations = CitationService.build(chunks)

        yield CitationEvent(citations)

        # -------------------------
        # 5. Done
        # -------------------------
        yield {"type": "done"}