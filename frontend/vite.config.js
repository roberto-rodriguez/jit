import { defineConfig } from 'vite';
import { resolve } from 'path';

const webappDir = resolve(__dirname, '../src/main/webapp');

export default defineConfig({
  publicDir: webappDir,
  server: {
    port: 5173,
    strictPort: true,
    fs: {
      allow: [webappDir]
    }
  },
  build: {
    outDir: webappDir,
    emptyOutDir: false,
    copyPublicDir: false
  }
});
