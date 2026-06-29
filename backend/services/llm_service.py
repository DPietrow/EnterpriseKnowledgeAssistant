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

CRITICAL RULES:
- You MUST ONLY use document titles EXACTLY as provided in the context.
- NEVER generate, guess, or replace missing document titles.
- NEVER use the phrase "Unknown Document".
- If a title is missing or empty, DO NOT output a citation for that sentence.
- Citations MUST use EXACT format:
  (📄 Document Title — Page X)
- Titles are authoritative and must not be modified in any way.
- Never infer document identity from content.

You must be precise, conservative, and faithful to the context.
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

            buffer = ""

            for chunk in stream:
                delta = chunk.choices[0].delta.content
            
                if not delta:
                    continue
                
                buffer += delta
            
                if (
                    len(buffer) > 80
                    or buffer.endswith(".")
                    or buffer.endswith("\n")
                ):
                    yield buffer
                    buffer = ""
            
            if buffer:
                yield buffer

        except Exception as e:
            import traceback
            traceback.print_exc()
            yield f"\n[ERROR]: {str(e)}"