import { reactRouter } from "@react-router/dev/vite";
import viteTailwind from "@tailwindcss/vite";
import postcssTailwind from "@tailwindcss/postcss";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA as vitePwa } from "vite-plugin-pwa";
import { cloudflareDevProxy } from "@react-router/dev/vite/cloudflare";

export default defineConfig({
  css: {
    postcss: {
      plugins: [postcssTailwind],
    },
  },
  plugins: [
    viteTailwind(),
    cloudflareDevProxy({
      getLoadContext({ context }) {
        return { cloudflare: context.cloudflare };
      }
    }),
    reactRouter(),
    tsconfigPaths(),
    vitePwa({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
      manifest: {
        name: "Commute",
        start_url: "/",
        short_name: "Commute",
        theme_color: "#000000",
        display: "standalone",
        icons: [
          {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          }
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
