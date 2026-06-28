import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AppLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>

    </div>
  );
}