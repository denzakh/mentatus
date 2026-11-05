import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

/*
Сборка и тесты в одном конфиге: Vite собирает приложение, vitest берёт
секцию `test`.

`base: "./"` — относительные пути к ассетам, чтобы сборка работала и из
корня домена, и из подпапки (GitHub Pages).
*/
export default defineConfig({
  plugins: [react()],
  base: "./",
  publicDir: "public",
  build: {
    outDir: "dist"
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/setupTests.ts"],
    include: ["src/**/*.test.{js,jsx,ts,tsx}"],
    pool: "vmThreads",
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      reportOnFailure: true
    }
  }
});
