import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const linkClass = (path) =>
    `block px-3 py-2 rounded-md transition ${
      location.pathname === path
        ? "bg-slate-800 text-white"
        : "text-slate-400 hover:text-white hover:bg-slate-800/50"
    }`;

  return (
    <aside className="w-64 border-r border-slate-800 p-6">

      <h2 className="text-lg font-semibold text-slate-200 mb-6">
        Navigation
      </h2>

      <nav className="space-y-2 mb-8">
        <Link to="/" className={linkClass("/")}>
          Chat
        </Link>

        <Link to="/upload" className={linkClass("/upload")}>
          Upload
        </Link>

        <Link to="/architecture" className={linkClass("/architecture")}>
          Architecture
        </Link>
      </nav>

      <div className="border-t border-slate-800 pt-6 space-y-3">
        <h2 className="text-sm font-semibold text-slate-400">
          External
        </h2>

        <a
          href="https://github.com/DPietrow/EnterpriseKnowledgeAssistant"
          target="_blank"
          className="block text-slate-400 hover:text-white transition"
        >
          GitHub
        </a>

        <a
          href="https://linktr.ee/davidpietrow"
          target="_blank"
          className="block text-slate-400 hover:text-white transition"
        >
          Linktree
        </a>
      </div>

    </aside>
  );
}