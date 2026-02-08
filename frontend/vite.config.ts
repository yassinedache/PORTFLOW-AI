import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React runtime
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Data layer
          'vendor-query': ['@tanstack/react-query'],
          // Animation
          'vendor-motion': ['framer-motion'],
          // Radix UI primitives
          'vendor-radix': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-tabs',
            '@radix-ui/react-slot',
            '@radix-ui/react-label',
            '@radix-ui/react-select',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-avatar',
            '@radix-ui/react-separator',
            '@radix-ui/react-scroll-area',
          ],
          // Charts (heavy — only loaded by pages that use them)
          'vendor-charts': ['recharts'],
          // QR code libraries
          'vendor-qr': ['qrcode.react', 'html5-qrcode'],
          // Forms & validation
          'vendor-forms': ['zod', 'react-hook-form'],
          // HTTP & realtime
          'vendor-http': ['axios', 'socket.io-client'],
        },
      },
    },
  },
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
