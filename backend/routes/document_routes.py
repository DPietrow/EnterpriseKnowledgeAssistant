from flask import Blueprint, request, Response, stream_with_context, jsonify, current_app

from services.document_service import DocumentService
from services.retrieval_service import RetrievalService
from services.rag_orchestrator import RAGOrchestrator
from services.prompt_service import PromptService
from services.llm_service import LLMService
from services.streaming_service import StreamingService

document_bp = Blueprint("documents", __name__)


@document_bp.route("/upload", methods=["POST"])
def upload_document():

    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    document = DocumentService.save_uploaded_file(
        file,
        current_app.config["UPLOAD_FOLDER"]
    )

    return jsonify({
        "message": "Upload successful",
        "document_id": document.id
    }), 201


@document_bp.route("/search", methods=["POST"])
def search():

    data = request.get_json()

    if not data or "query" not in data:
        return jsonify({"error": "Missing query"}), 400

    results = RetrievalService.search(data["query"])

    return jsonify([
        {
            "chunk_id": result["chunk"].id,
            "document_id": result["chunk"].document.id,
            "document_title": result["chunk"].document.title,
            "document_filename": result["chunk"].document.filename,
            "page_number": result["chunk"].page_number,
            "chunk_index": result["chunk"].chunk_index,
            "score": round(result["score"], 4),
            "content": result["chunk"].content
        }
        for result in results
    ])

@document_bp.route("/ask-stream", methods=["POST"])
def ask_stream():

    question = request.json["query"]

    chunks = RetrievalService.search(question)

    context = PromptService.build_context(chunks)

    return Response(
        stream_with_context(
            StreamingService.stream(
                question,
                context,
                chunks
            )
        ),
        mimetype="text/event-stream"
    )