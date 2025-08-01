import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/user": "http://localhost:8000",
      "/blog": "http://localhost:8000",
      "/follow": "http://localhost:8000",
    },
  },
});
