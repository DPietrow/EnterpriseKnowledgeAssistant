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

            print("Loading LLM...")

            LLMService._tokenizer = AutoTokenizer.from_pretrained(model_name)

            LLMService._model = AutoModelForCausalLM.from_pretrained(
                model_name,
                torch_dtype=torch.float16,
                device_map="auto"
            )

            LLMService._model.eval()

            print("LLM ready")

        return LLMService._model

    @staticmethod
    def stream_generate(question, context):

        model = LLMService.load()
    
        messages = [
            {"role": "system", "content": SYSTEM_PROMPT},
            {
                "role": "user",
                "content": f"Context:\n{context}\n\nQuestion:\n{question}"
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
        ).to(model.device)
    
        streamer = TextIteratorStreamer(
            LLMService._tokenizer,
            skip_prompt=True,
            skip_special_tokens=True
        )
    
        # ✔ REQUIRED: minimal safe thread (NOT “architecture threading”)
        # This is standard HuggingFace pattern and safe in production Flask
        def run():
            with torch.inference_mode():
                model.generate(
                    **inputs,
                    streamer=streamer,
                    max_new_tokens=200,
                    do_sample=False
                )
    
        thread = threading.Thread(target=run)
        thread.start()
    
        for token in streamer:
            yield token