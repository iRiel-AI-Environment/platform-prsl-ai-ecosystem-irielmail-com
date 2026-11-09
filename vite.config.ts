import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tailwindcss(),
    tanstackStart({
      server: {
        entry: "./server.ts",
      },
    }),
    nitro(),
    tsconfigPaths(),
    viteReact(),
  ],
  resolve: {
    dedupe: ["react", "react-dom"],
  },
});
