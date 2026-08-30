import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
  base: process.env.BASE_PATH || '/',
  server: { port: Number(process.env.PORT) || 21947, host: '0.0.0.0' },
});