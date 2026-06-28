from services.llm_service import LLMService
from services.citation_service import CitationService
from services.events import TokenEvent, CitationEvent


class RAGOrchestrator:

    @staticmethod
    def stream(question, context, chunks):

        # Stream answer
        for token in LLMService.stream_generate(
            question,
            context
        ):
            yield TokenEvent(token)

        # Build citations after answer
        citations = CitationService.build(chunks)

        yield CitationEvent(citations)