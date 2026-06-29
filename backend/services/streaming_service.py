import json
from services.rag_orchestrator import RAGOrchestrator
from services.events import TokenEvent, CitationEvent


class StreamingService:

    @staticmethod
    def stream(question, context, chunks):

        for event in RAGOrchestrator.stream(question, context, chunks):

            if isinstance(event, dict):
                yield f"data: {json.dumps(event)}\n\n"
                continue

            if isinstance(event, TokenEvent):
                yield f"data: {json.dumps({
                    'type': 'token',
                    'value': event.token
                })}\n\n"
                continue

            if isinstance(event, CitationEvent):
                yield f"data: {json.dumps({
                    'type': 'citations',
                    'data': event.citations
                })}\n\n"
                continue

        yield "data: [DONE]\n\n"