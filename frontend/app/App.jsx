import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./components/layout/AppLayout";

import ChatPage from "./pages/ChatPage";
import UploadPage from "./pages/UploadPage";
import ArchitecturePage from "./pages/ArchitecturePage";

export default function App() {
  return (
    <BrowserRouter>

      <AppLayout>

        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/architecture" element={<ArchitecturePage />} />
        </Routes>

      </AppLayout>

    </BrowserRouter>
  );
}