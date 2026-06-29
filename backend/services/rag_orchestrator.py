from services.retrieval_service import RetrievalService
from services.prompt_service import PromptService
from services.llm_service import LLMService
from services.citation_service import CitationService
from services.events import TokenEvent, CitationEvent


class RAGOrchestrator:

    @staticmethod
    def stream(question, context, chunks):

        yield {"type": "lifecycle", "stage": "retrieval_done"}
        yield {"type": "lifecycle", "stage": "prompt_ready"}

        for token in LLMService.stream_generate(question, context):
            yield TokenEvent(token)

        citations = CitationService.build(chunks)
        yield CitationEvent(citations)

        yield {"type": "done"}