export const architectureDecisions = [
  {
    id: "llm",

    title: "Local LLM Strategy",

    question:
      "Should inference run locally or through a hosted API?",

    decision: "Microsoft Phi-4",

    alternatives: [
      {
        name: "OpenAI GPT-4",
        reason:
          "Excellent reasoning and massive context windows."
      },
      {
        name: "Claude",
        reason:
          "Strong long-context performance."
      },
      {
        name: "Llama",
        reason:
          "Popular open-source alternative."
      }
    ],

    why: [
      "Runs completely offline",
      "No per-token API costs",
      "Enterprise privacy",
      "Predictable latency",
      "Easy future model swapping"
    ],

    tradeoffs: [
      "Smaller context window",
      "Lower reasoning ceiling than GPT-4",
      "Requires local compute"
    ],

    future:
      "Introduce model routing so difficult questions can automatically use GPT-4 while everyday document retrieval remains local."
  },

  {
    id: "rag",

    title: "Retrieval-Augmented Generation",

    question:
      "Should company knowledge be fine-tuned into the model?",

    decision: "RAG",

    alternatives: [
      {
        name: "Fine-tuning",
        reason:
          "Can specialize the model but requires retraining."
      }
    ],

    why: [
      "Documents update instantly",
      "No retraining pipeline",
      "Source citations",
      "Explainable responses",
      "Lower operational cost"
    ],

    tradeoffs: [
      "Retrieval quality matters",
      "Slightly higher latency",
      "Requires vector search"
    ],

    future:
      "Hybrid retrieval using BM25 + semantic search."
  },

  {
    id: "streaming",

    title: "Streaming Architecture",

    question:
      "Should users wait for the entire response?",

    decision: "Server-Sent Events",

    alternatives: [
      {
        name: "Polling",
        reason: "Simple but slow."
      },
      {
        name: "WebSockets",
        reason: "Powerful but unnecessary for one-way communication."
      }
    ],

    why: [
      "Instant first token",
      "Native browser support",
      "Simpler backend",
      "Better perceived latency"
    ],

    tradeoffs: [
      "One-way communication",
      "Requires streaming state management"
    ],

    future:
      "Support cancellation and resume."
  },

  {
    id: "embedding",

    title: "Embedding Model",

    question:
      "Which embedding model should power semantic search?",

    decision:
      "all-MiniLM-L6-v2",

    alternatives: [
      {
        name: "Larger embedding models",
        reason:
          "Better semantic accuracy."
      }
    ],

    why: [
      "CPU friendly",
      "Fast inference",
      "Small memory footprint",
      "Excellent quality for enterprise search"
    ],

    tradeoffs: [
      "Lower embedding quality than larger models"
    ],

    future:
      "Evaluate multilingual embeddings."
  }
];