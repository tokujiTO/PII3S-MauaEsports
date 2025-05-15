import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/player': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/api': {
        target: import.meta.env.VITE_API_MAUAE,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
