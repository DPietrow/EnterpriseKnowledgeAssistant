import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const linkClass = (path) =>
    `text-sm font-medium transition ${
      location.pathname === path
        ? "text-white"
        : "text-slate-400 hover:text-white"
    }`;

  return (
    <header className="w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Brand */}
        <div className="text-white font-semibold tracking-tight">
          Apollo: Enterprise Knowledge Assistant
        </div>

        {/* Links */}
        <nav className="flex gap-6">
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

      </div>
    </header>
  );
}