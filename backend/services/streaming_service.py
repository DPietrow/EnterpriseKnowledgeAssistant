import json
from services.rag_orchestrator import RAGOrchestrator
from services.events import TokenEvent, CitationEvent


class StreamingService:

    @staticmethod
    def stream(question, context, chunks):

        for event in RAGOrchestrator.stream(question, context, chunks):

            # -------------------------
            # DICT EVENTS
            # -------------------------
            if isinstance(event, dict):
                yield json.dumps(event)
                continue

            # -------------------------
            # TOKEN EVENTS
            # -------------------------
            if isinstance(event, TokenEvent):
                yield json.dumps({
                    "type": "token",
                    "value": event.token
                })
                continue

            # -------------------------
            # CITATION EVENTS
            # -------------------------
            if isinstance(event, CitationEvent):
                yield json.dumps({
                    "type": "citations",
                    "data": event.citations
                })
                continue

        yield json.dumps({"type": "done"})