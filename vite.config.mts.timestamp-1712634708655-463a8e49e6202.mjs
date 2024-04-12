// vite.config.mts
import { fileURLToPath, URL } from "node:url";
import { existsSync } from "node:fs";
import { defineConfig } from "file:///opt/prod/taiji/ainms/source/ainms-vueclient/node_modules/vite/dist/node/index.js";
import vue from "file:///opt/prod/taiji/ainms/source/ainms-vueclient/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { viteStaticCopy } from "file:///opt/prod/taiji/ainms/source/ainms-vueclient/node_modules/vite-plugin-static-copy/dist/index.js";
var __vite_injected_original_import_meta_url = "file:///opt/prod/taiji/ainms/source/ainms-vueclient/vite.config.mts";
var getFileFromRepo = (file) => existsSync(fileURLToPath(new URL(`../node_modules/${file}`, __vite_injected_original_import_meta_url))) ? fileURLToPath(new URL(`../node_modules/${file}`, __vite_injected_original_import_meta_url)) : fileURLToPath(new URL(`./node_modules/${file}`, __vite_injected_original_import_meta_url));
var { getAbsoluteFSPath } = await import("file:///opt/prod/taiji/ainms/source/ainms-vueclient/node_modules/swagger-ui-dist/index.js");
var swaggerUiPath = getAbsoluteFSPath();
var config = defineConfig({
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [
        {
          src: [
            `${swaggerUiPath}/*.{js,css,html,png}`,
            `!${swaggerUiPath}/**/index.html`,
            getFileFromRepo("axios/dist/axios.min.js"),
            fileURLToPath(new URL("./src/main/webapp/swagger-ui/index.html", __vite_injected_original_import_meta_url))
          ],
          dest: "swagger-ui"
        }
      ]
    })
  ],
  root: fileURLToPath(new URL("./src/main/webapp/", __vite_injected_original_import_meta_url)),
  publicDir: fileURLToPath(new URL("./target/classes/static/public", __vite_injected_original_import_meta_url)),
  cacheDir: fileURLToPath(new URL("./target/.vite-cache", __vite_injected_original_import_meta_url)),
  build: {
    emptyOutDir: true,
    outDir: fileURLToPath(new URL("./target/classes/static/", __vite_injected_original_import_meta_url)),
    rollupOptions: {
      input: {
        app: fileURLToPath(new URL("./src/main/webapp/index.html", __vite_injected_original_import_meta_url))
      }
    }
  },
  resolve: {
    alias: {
      vue: "@vue/compat/dist/vue.esm-bundler.js",
      "@": fileURLToPath(new URL("./src/main/webapp/app/", __vite_injected_original_import_meta_url))
    }
  },
  define: {
    I18N_HASH: '"generated_hash"',
    SERVER_API_URL: '"/"',
    APP_VERSION: `"${process.env.APP_VERSION ? process.env.APP_VERSION : "DEV"}"`
  },
  server: {
    host: true,
    port: 9e3,
    proxy: Object.fromEntries(
      ["/api", "/management", "/v3/api-docs", "/oauth2", "/login"].map((res) => [
        res,
        {
          target: "http://192.168.22.5:8080"
        }
      ])
    )
  }
});
var vite_config_default = config;
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL29wdC9wcm9kL3RhaWppL2Fpbm1zL3NvdXJjZS9haW5tcy12dWVjbGllbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9vcHQvcHJvZC90YWlqaS9haW5tcy9zb3VyY2UvYWlubXMtdnVlY2xpZW50L3ZpdGUuY29uZmlnLm10c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vb3B0L3Byb2QvdGFpamkvYWlubXMvc291cmNlL2Fpbm1zLXZ1ZWNsaWVudC92aXRlLmNvbmZpZy5tdHNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCc7XG5pbXBvcnQgeyBleGlzdHNTeW5jIH0gZnJvbSAnbm9kZTpmcyc7XG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnO1xuaW1wb3J0IHsgdml0ZVN0YXRpY0NvcHkgfSBmcm9tICd2aXRlLXBsdWdpbi1zdGF0aWMtY29weSc7XG5cbmNvbnN0IGdldEZpbGVGcm9tUmVwbyA9IChmaWxlOiBzdHJpbmcpID0+XG4gIGV4aXN0c1N5bmMoZmlsZVVSTFRvUGF0aChuZXcgVVJMKGAuLi9ub2RlX21vZHVsZXMvJHtmaWxlfWAsIGltcG9ydC5tZXRhLnVybCkpKVxuICAgID8gZmlsZVVSTFRvUGF0aChuZXcgVVJMKGAuLi9ub2RlX21vZHVsZXMvJHtmaWxlfWAsIGltcG9ydC5tZXRhLnVybCkpXG4gICAgOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoYC4vbm9kZV9tb2R1bGVzLyR7ZmlsZX1gLCBpbXBvcnQubWV0YS51cmwpKTtcblxuY29uc3QgeyBnZXRBYnNvbHV0ZUZTUGF0aCB9ID0gYXdhaXQgaW1wb3J0KCdzd2FnZ2VyLXVpLWRpc3QnKTtcbmNvbnN0IHN3YWdnZXJVaVBhdGggPSBnZXRBYnNvbHV0ZUZTUGF0aCgpO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWNvbnN0XG5sZXQgY29uZmlnID0gZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHZ1ZSgpLFxuICAgIHZpdGVTdGF0aWNDb3B5KHtcbiAgICAgIHRhcmdldHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHNyYzogW1xuICAgICAgICAgICAgYCR7c3dhZ2dlclVpUGF0aH0vKi57anMsY3NzLGh0bWwscG5nfWAsXG4gICAgICAgICAgICBgISR7c3dhZ2dlclVpUGF0aH0vKiovaW5kZXguaHRtbGAsXG4gICAgICAgICAgICBnZXRGaWxlRnJvbVJlcG8oJ2F4aW9zL2Rpc3QvYXhpb3MubWluLmpzJyksXG4gICAgICAgICAgICBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjL21haW4vd2ViYXBwL3N3YWdnZXItdWkvaW5kZXguaHRtbCcsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgICAgICAgIF0sXG4gICAgICAgICAgZGVzdDogJ3N3YWdnZXItdWknLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9KSxcbiAgXSxcbiAgcm9vdDogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYy9tYWluL3dlYmFwcC8nLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgcHVibGljRGlyOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vdGFyZ2V0L2NsYXNzZXMvc3RhdGljL3B1YmxpYycsIGltcG9ydC5tZXRhLnVybCkpLFxuICBjYWNoZURpcjogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3RhcmdldC8udml0ZS1jYWNoZScsIGltcG9ydC5tZXRhLnVybCkpLFxuICBidWlsZDoge1xuICAgIGVtcHR5T3V0RGlyOiB0cnVlLFxuICAgIG91dERpcjogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3RhcmdldC9jbGFzc2VzL3N0YXRpYy8nLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBpbnB1dDoge1xuICAgICAgICBhcHA6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMvbWFpbi93ZWJhcHAvaW5kZXguaHRtbCcsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIHZ1ZTogJ0B2dWUvY29tcGF0L2Rpc3QvdnVlLmVzbS1idW5kbGVyLmpzJyxcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYy9tYWluL3dlYmFwcC9hcHAvJywgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgfSxcbiAgfSxcbiAgZGVmaW5lOiB7XG4gICAgSTE4Tl9IQVNIOiAnXCJnZW5lcmF0ZWRfaGFzaFwiJyxcbiAgICBTRVJWRVJfQVBJX1VSTDogJ1wiL1wiJyxcbiAgICBBUFBfVkVSU0lPTjogYFwiJHtwcm9jZXNzLmVudi5BUFBfVkVSU0lPTiA/IHByb2Nlc3MuZW52LkFQUF9WRVJTSU9OIDogJ0RFVid9XCJgLFxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiB0cnVlLFxuICAgIHBvcnQ6IDkwMDAsXG4gICAgcHJveHk6IE9iamVjdC5mcm9tRW50cmllcyhcbiAgICAgIFsnL2FwaScsICcvbWFuYWdlbWVudCcsICcvdjMvYXBpLWRvY3MnLCAnL29hdXRoMicsICcvbG9naW4nXS5tYXAocmVzID0+IFtcbiAgICAgICAgcmVzLFxuICAgICAgICB7XG4gICAgICAgICAgdGFyZ2V0OiAnaHR0cDovLzE5Mi4xNjguMjIuNTo4MDgwJyxcbiAgICAgICAgfSxcbiAgICAgIF0pLFxuICAgICksXG4gIH0sXG59KTtcblxuLy8gamhpcHN0ZXItbmVlZGxlLWFkZC12aXRlLWNvbmZpZyAtIEpIaXBzdGVyIHdpbGwgYWRkIGN1c3RvbSBjb25m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
