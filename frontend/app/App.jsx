import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UploadPage from "@pages/UploadPage";
import ChatPage from "@pages/ChatPage";
import ArchitecturePage from "@pages/ArchitecturePage";

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: 20 }}>
        <nav style={{ display: "flex", gap: 12 }}>
          <Link to="/">Chat</Link>
          <Link to="/upload">Upload</Link>
          <Link to="/architecture">Architecture</Link>
        </nav>

        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/architecture" element={<ArchitecturePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}