import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  server: {
    open: true
  },

  vite: {
    plugins: [tailwindcss()]
  }
});