import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  publicDir: resolve(__dirname, '../src/main/webapp'),
  server: {
    port: 5173,
    strictPort: true
  },
  build: {
    outDir: resolve(__dirname, '../src/main/webapp'),
    emptyOutDir: true
  }
});
