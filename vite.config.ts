import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/wordle-replica/",
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./tests/setup.js",
    coverage: {
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/utils/*.{tsx}", "src/__tests__/*.{ts,tsx}", "src/main.tsx"],
    },
  },
});
