from flask import (
    Blueprint,
    request,
    Request,
    Response,
    jsonify,
    current_app,
    stream_with_context
)
from werkzeug.utils import secure_filename
from extensions import db
from models.document import Document
from services.job_store import JobStore
from services.document_service import DocumentService
from services.retrieval_service import RetrievalService
from services.rag_orchestrator import RAGOrchestrator
from services.prompt_service import PromptService
from services.llm_service import LLMService
from services.streaming_service import StreamingService
from services.chunking_service import ChunkingService

document_bp = Blueprint("documents", __name__)

@document_bp.route("/upload", methods=["POST"])
def upload():

    file = request.files["file"]

    document = DocumentService.save_uploaded_file(
        file,
        current_app.config["UPLOAD_FOLDER"]
    )

    document.status = "queued"
    db.session.commit()

    # TEMPORARY
    # Later this becomes:
    # queue.enqueue(DocumentService.index, document.id)
    DocumentService.index(document.id)

    return jsonify({
        "id": document.id,
        "status": document.status,
        "chunk_count": document.chunk_count,
        "error": document.error_message
    })

@document_bp.route("/<int:document_id>/status")
def document_status(document_id):

    document = Document.query.get_or_404(document_id)

    return jsonify({
        "id": document.id,
        "status": document.status,
        "stage": document.stage,
        "stage_order": document.stage_order,
        "chunk_count": document.chunk_count,
    })

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

@document_bp.route("/ask-stream", methods=["POST", "OPTIONS"])
def ask_stream():

    data = request.get_json(force=True, silent=True) or {}
    question = data.get("query")

    if not question:
        return jsonify({"error": "missing query"}), 400

    chunks = RetrievalService.search(question)
    context = PromptService.build_context(chunks)

    return Response(
        StreamingService.stream(question, context, chunks),
        mimetype="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no"
        }
    )