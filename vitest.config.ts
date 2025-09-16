import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,               // 👈 habilita expect/describe/it globais no setup
  },
  plugins: [tsconfigPaths()],
});

