from services.llm_service import LLMService
from services.citation_service import CitationService
from services.events import TokenEvent, CitationEvent


class RAGOrchestrator:

    @staticmethod
    def stream(question, context, chunks):

        # lifecycle event (consistent dict only)
        yield {"type": "lifecycle", "stage": "retrieval_done"}
        yield {"type": "lifecycle", "stage": "prompt_ready"}

        # 🔥 STREAM TOKENS AS EVENTS
        for token in LLMService.stream_generate(question, context):
            yield TokenEvent(token)

        # 🔥 CITATIONS LAST
        citations = CitationService.build(chunks)
        yield CitationEvent(citations)

        # done event
        yield {"type": "done"}