import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://zenquotes.io", // The API's base URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Strip '/api' prefix
      },
    },
  },
});
