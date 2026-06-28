import json

from services.rag_orchestrator import RAGOrchestrator
from services.events import TokenEvent, CitationEvent


class StreamingService:

    @staticmethod
    def stream(question, context, chunks):

        for event in RAGOrchestrator.stream(
            question,
            context,
            chunks
        ):

            if isinstance(event, TokenEvent):

                yield f"data: {event.token}\n\n"

            elif isinstance(event, CitationEvent):

                yield (
                    "data: "
                    + json.dumps({
                        "type": "citations",
                        "data": event.citations
                    })
                    + "\n\n"
                )

        yield "data: [DONE]\n\n"