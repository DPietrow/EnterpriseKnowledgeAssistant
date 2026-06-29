export default function CitationCard({ citation }) {
  // Normalize title from all possible backend shapes
  // test add
  const rawTitle =
    citation.title ||
    citation.document_title ||
    citation.filename ||
    citation.document ||
    "";
  const title =
    rawTitle && rawTitle.trim()
      ? rawTitle.replace(".pdf", "")
      : "Unknown Document";

  const page =
    citation.page ??
    citation.page_number ??
    "Unknown";

  const score =
    typeof citation.score === "number"
      ? citation.score
      : 0;

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
        📄 {title}
      </div>

      <div className="text-slate-400">
        Page {page}
      </div>

      <div className="text-xs text-blue-300">
        Similarity {(score * 100).toFixed(1)}%
      </div>
    </div>
  );
}