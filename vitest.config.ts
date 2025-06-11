import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  test: {
    coverage: {
      provider: "istanbul",
    },
  },
  plugins: [tsconfigPaths()],
});
