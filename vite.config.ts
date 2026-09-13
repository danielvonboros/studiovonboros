import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    // erlaubt Imports wie "@/components/…" statt "../../components/…"
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
});
