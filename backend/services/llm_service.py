from openai import OpenAI
import os


class LLMService:

    _client = None

    @staticmethod
    def get_client():
        if LLMService._client is None:
            api_key = os.getenv("OPENAI_API_KEY")

            if not api_key:
                raise Exception("OPENAI_API_KEY is missing")

            LLMService._client = OpenAI(api_key=api_key)

        return LLMService._client


    @staticmethod
    def generate(question, context):

        client = LLMService.get_client()

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are an enterprise knowledge assistant. "
                        "You answer ONLY using the provided context."
                    )
                },
                {
                    "role": "user",
                    "content": f"""
Context:
{context}

Question:
{question}
"""
                }
            ],
            temperature=0.2,
        )

        return response.choices[0].message.content

    @staticmethod
    def stream_generate(question, context):
        client = LLMService.get_client()

        try:
            stream = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {
                        "role": "system",
                        "content": """
    You are an enterprise knowledge assistant.

    You MUST ALWAYS include citations in this format:
    (📄 Document Title — Page Number)

    Rules:
    - Always include document title
    - Never output similarity scores or chunk IDs
    - Citations only at end of sentences
    """
                    },
                    {
                        "role": "user",
                        "content": f"Context:\n{context}\n\nQuestion:\n{question}"
                    }
                ],
                temperature=0.2,
                stream=True,
            )

            # 🔥 PURE DELTA STREAM (NO BUFFER, NO SSE)
            for chunk in stream:
                delta = chunk.choices[0].delta.content
                if delta:
                    yield delta

            yield "\n[DONE]"

        except Exception as e:
            import traceback
            traceback.print_exc()
            yield f"\n[ERROR]: {str(e)}"