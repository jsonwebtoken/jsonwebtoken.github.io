import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  test: {
    coverage: {
      provider: "istanbul",
    },
    exclude: ['e2e', 'node_modules']
  },
  plugins: [tsconfigPaths()],
});
