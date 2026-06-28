import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex justify-between px-6 py-4 bg-gray-900 border-b border-gray-800">
      <div className="font-bold">Enterprise RAG Assistant</div>

      <div className="space-x-4 text-sm">
        <Link to="/">Chat</Link>
        <Link to="/docs">Documents</Link>
        <Link to="/architecture">Architecture</Link>
      </div>
    </div>
  );
}