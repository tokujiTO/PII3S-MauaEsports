import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// No vite.config.ts, use process.env em vez de import.meta.env

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/player': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/api': {
        target: 'https://API-Esports.lcstuber.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
