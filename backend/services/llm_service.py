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
                            "You are an enterprise knowledge assistant. "
                            "You answer ONLY using the provided context. "
                            "When you use information, you MUST cite it like this:"
                            "(📄 {Document Title}, Page {Page Number})"
                            "Do NOT output raw similarity scores or chunk IDs."
                            "Do NOT say 'Page 2' alone."
                            "Always include the document title with page number in parentheses immediately after the fact."
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
    
            buffer = ""
    
            for chunk in stream:
                delta = chunk.choices[0].delta.content
    
                if not delta:
                    continue
                
                buffer += delta
    
                # 🚀 Flush on sentence boundaries for clean UX
                if buffer.endswith((" ", ".", "?", "!", "\n")):
                    yield buffer
                    buffer = ""
    
            # 🔥 flush remaining buffer at end
            if buffer:
                yield buffer
    
            # optional completion marker (VERY useful for frontend)
            yield "\n\n[DONE]"
    
        except Exception as e:
            yield f"\n\n[STREAM ERROR]: {str(e)}"