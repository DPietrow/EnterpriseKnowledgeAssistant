from transformers import AutoTokenizer, AutoModelForCausalLM, TextIteratorStreamer
from prompts import SYSTEM_PROMPT
import torch
import threading


class LLMService:

    _model = None
    _tokenizer = None

    @staticmethod
    def load():

        if LLMService._model is None:

            model_name = "microsoft/Phi-4-mini-instruct"

            print("Loading LLM on device...")

            LLMService._tokenizer = AutoTokenizer.from_pretrained(model_name)

            LLMService._model = AutoModelForCausalLM.from_pretrained(
                model_name,
                torch_dtype=torch.float16,
                device_map={"": 0}
            )

            LLMService._model.eval()

            print("LLM ready (GPU if available).")

    @staticmethod
    def stream_generate(question, context):

        LLMService.load()

        messages = [

            {
                "role":"system",
                "content":SYSTEM_PROMPT
            },

            {
                "role":"user",
                "content":f"""
            Context:

            {context}

            Question:

            {question}
            """
            }
            ]
        prompt = LLMService._tokenizer.apply_chat_template(
            messages,
            tokenize=False,
            add_generation_prompt=True
        )

        inputs = LLMService._tokenizer(
            prompt,
            return_tensors="pt"
        ).to(LLMService._model.device)

        streamer = TextIteratorStreamer(
            LLMService._tokenizer,
            skip_prompt=True,
            skip_special_tokens=True,
            clean_up_tokenization_spaces=True
        )

        def run():
            with torch.inference_mode():
                LLMService._model.generate(
                    **inputs,
                    streamer=streamer,
                    max_new_tokens=200,
                    do_sample=False
                )

        thread = threading.Thread(target=run)
        thread.start()

        for token in streamer:
            print(repr(token))
            yield token