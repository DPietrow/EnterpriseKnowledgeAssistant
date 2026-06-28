import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/app",
      "@components": "/app/components",
      "@pages": "/app/pages"
    }
  }
});