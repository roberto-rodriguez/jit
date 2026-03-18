import { defineConfig, searchForWorkspaceRoot } from 'vite';
import { resolve } from 'path';

const frontendDir = __dirname;
const webappDir = resolve(__dirname, '../src/main/webapp');

export default defineConfig({
  publicDir: webappDir,
  server: {
    port: 5173,
    strictPort: true,
    fs: {
      allow: [searchForWorkspaceRoot(process.cwd()), frontendDir, webappDir]
    }
  },
  build: {
    outDir: webappDir,
    emptyOutDir: false,
    copyPublicDir: false
  }
});
