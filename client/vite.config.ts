import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist', // Ensures the output is in client/dist
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/graphql': {
        target: 'http://localhost:3001/',
        changeOrigin: true,
        secure: false,
      },
      '/api': {
        target: 'http://localhost:3001/',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
