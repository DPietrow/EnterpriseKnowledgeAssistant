from sentence_transformers import SentenceTransformer
import threading

class EmbeddingService:
    _model = None
    _lock = threading.Lock()

    @classmethod
    def get_model(cls):
        if cls._model is None:
            with cls._lock:
                if cls._model is None:
                    print("[EMBEDDING] Loading MiniLM model...")
                    cls._model = SentenceTransformer("all-MiniLM-L6-v2")
        return cls._model

    @classmethod
    def embed_text(cls, text: str):
        model = cls.get_model()
        return model.encode(
            text,
            convert_to_numpy=True,
            normalize_embeddings=True,
        ).tolist()

    @classmethod
    def embed_batch(cls, texts: list[str]):
        model = cls.get_model()

        return model.encode(
            texts,
            batch_size=8,
            convert_to_numpy=True,
            normalize_embeddings=True,
            show_progress_bar=False
        ).tolist()