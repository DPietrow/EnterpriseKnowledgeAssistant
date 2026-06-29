import json
from services.rag_orchestrator import RAGOrchestrator
from services.events import TokenEvent, CitationEvent


class StreamingService:

    @staticmethod
    def stream(question, context, chunks):

        for event in RAGOrchestrator.stream(question, context, chunks):

            # -------------------------
            # DICT EVENTS (lifecycle/done)
            # -------------------------
            if isinstance(event, dict):
                yield f"data: {json.dumps(event)}\n\n"
                continue

            # -------------------------
            # TOKEN EVENTS
            # -------------------------
            if isinstance(event, TokenEvent):
                value = event.token

                if not value or value.strip() == "":
                    continue
                
                yield f"data: {json.dumps({
                    'type': 'token',
                    'value': value
                })}\n\n"

            # -------------------------
            # CITATION EVENTS
            # -------------------------
            elif isinstance(event, CitationEvent):
                yield f"data: {json.dumps({'type': 'citations', 'data': event.citations})}\n\n"

        yield "data: [DONE]\n\n"