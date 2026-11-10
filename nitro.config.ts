import { defineConfig } from "nitro";

export default defineConfig({
  preset: "node_server",
  output: {
    // Lovable deploys the dist/ directory; Nitro defaults to .output/.
    dir: "dist",
  },
});
