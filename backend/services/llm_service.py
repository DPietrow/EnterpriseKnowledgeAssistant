from openai import OpenAI
import os

class LLMService:

    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    @staticmethod
    def generate(question, context):

        response = LLMService.client.chat.completions.create(
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