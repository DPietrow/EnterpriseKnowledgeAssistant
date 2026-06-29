from sentence_transformers import SentenceTransformer
import threading

class EmbeddingService:
    _model = None
    _lock = threading.Lock()

    @classmethod
    def initialize(cls):
        """
        Call this once at app startup to avoid cold-start latency.
        """
        print("[EMBEDDING] Preloading MiniLM model...")
        cls._model = SentenceTransformer("all-MiniLM-L6-v2")
        print("[EMBEDDING] Model loaded successfully")

    @classmethod
    def get_model(cls):
        if cls._model is None:
            with cls._lock:
                if cls._model is None:
                    print("[EMBEDDING] Lazy loading model (cold start)...")
                    cls._model = SentenceTransformer("all-MiniLM-L6-v2")
        return cls._model

    @classmethod
    def embed_text(cls, text: str):
        model = cls.get_model()

        print(f"[EMBEDDING] Encoding text length={len(text)}")

        embedding = model.encode(
            text,
            convert_to_numpy=True,
            normalize_embeddings=True,
        )

        return embedding.tolist()
    
    @classmethod
    def embed_batch(cls, texts: list[str]):
        model = cls.get_model()
    
        print(f"[EMBEDDING] Batch encoding {len(texts)} chunks")
    
        embeddings = model.encode(
            texts,
            batch_size=32,              # IMPORTANT
            convert_to_numpy=True,
            normalize_embeddings=True,
            show_progress_bar=True
        )
    
        return embeddings.tolist()