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
                        "content": (
                            """ 
                            You are an enterprise knowledge assistant.
                                Rules:
                                - Use ONLY provided context.
                                - ALWAYS cite sources in this format:
                                  (📄 Document Title — Page X)
                                - Citations must appear at end of sentences.
                                - Never output similarity scores or chunk IDs.
                                - Never output raw page numbers alone.
                            """
                        )
                    },
                    {
                        "role": "user",
                        "content": f"Context:\n{context}\n\nQuestion:\n{question}"
                    }
                ],
                temperature=0.2,
                stream=True,
            )

            for chunk in stream:
                delta = chunk.choices[0].delta.content

                if delta:
                    yield f"data: {delta}\n\n"

            yield "data: [DONE]\n\n"

        except Exception as e:
            import traceback
            print("🔥 STREAM ERROR")
            traceback.print_exc()
            yield f"data: [ERROR] {str(e)}\n\n"