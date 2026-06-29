export default function CitationCard({ citation }) {

  const title =
    citation.title ||
    citation.document_title ||
    citation.filename ||
    "Unknown Document";

  return (
    <div
      className="
      mt-3
      rounded-lg
      border
      border-slate-700
      bg-slate-800
      p-3
      text-sm
      transition
      hover:border-blue-400
      hover:bg-slate-700
      cursor-pointer
      "
    >

      <div className="font-semibold">
        📄 {title.replace(".pdf", "")}
      </div>

      <div className="text-slate-400">
        Page {citation.page}
      </div>

      <div className="text-xs text-blue-300">
        Similarity {(citation.score * 100).toFixed(1)}%
      </div>

    </div>
  );
}