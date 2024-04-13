import { fileURLToPath, URL } from 'node:url';
import { existsSync } from 'node:fs';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const getFileFromRepo = (file: string) =>
  existsSync(fileURLToPath(new URL(`../node_modules/${file}`, import.meta.url)))
    ? fileURLToPath(new URL(`../node_modules/${file}`, import.meta.url))
    : fileURLToPath(new URL(`./node_modules/${file}`, import.meta.url));

const { getAbsoluteFSPath } = await import('swagger-ui-dist');
const swaggerUiPath = getAbsoluteFSPath();

// eslint-disable-next-line prefer-const
let config = defineConfig({
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [
        {
          src: [
            `${swaggerUiPath}/*.{js,css,html,png}`,
            `!${swaggerUiPath}/**/index.html`,
            getFileFromRepo('axios/dist/axios.min.js'),
            fileURLToPath(new URL('./src/main/webapp/swagger-ui/index.html', import.meta.url)),
          ],
          dest: 'swagger-ui',
        },
      ],
    }),
  ],
  root: fileURLToPath(new URL('./src/main/webapp/', import.meta.url)),
  publicDir: fileURLToPath(new URL('./target/classes/static/public', import.meta.url)),
  cacheDir: fileURLToPath(new URL('./target/.vite-cache', import.meta.url)),
  build: {
    emptyOutDir: true,
    outDir: fileURLToPath(new URL('./target/classes/static/', import.meta.url)),
    rollupOptions: {
      input: {
        app: fileURLToPath(new URL('./src/main/webapp/index.html', import.meta.url)),
      },
    },
  },
  resolve: {
    alias: {
      vue: '@vue/compat/dist/vue.esm-bundler.js',
      '@': fileURLToPath(new URL('./src/main/webapp/app/', import.meta.url)),
    },
  },
  define: {
    I18N_HASH: '"generated_hash"',
    SERVER_API_URL: '"/"',
    APP_VERSION: `"${process.env.APP_VERSION ? process.env.APP_VERSION : 'DEV'}"`,
  },
  server: {
    host: true,
    port: 9000,
    // proxy: 
    //   Object.fromEntries(
    //   ['/websocket','/api', '/management', '/v3/api-docs', '/oauth2', '/login'].map(res => [
    //     res,
    //     {
    //       target: 'http://192.168.22.5:8080',
    //     },
    //   ]),
    // ),
    proxy: {
      // 添加其他 HTTP 代理配置
      '/api': { target: 'http://192.168.22.5:8080' },
      '/management': { target: 'http://192.168.22.5:8080' },
      '/v3/api-docs': { target: 'http://192.168.22.5:8080' },
      '/oauth2': { target: 'http://192.168.22.5:8080' },
      '/login': { target: 'http://192.168.22.5:8080' },
      // 添加 WebSocket 代理配置
      '/websocket': {
        target: 'ws://192.168.22.5:8080',
        ws: true,
        changeOrigin: true,
      },
    },
  },
});

// jhipster-needle-add-vite-config - JHipster will add custom config

export default config;
