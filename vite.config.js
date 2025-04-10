import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js', // Create this file if needed
  },
  // server: {
  //   proxy: {
  //     '/.netlify/functions': {
  //       target: 'http://localhost:9999', // Where your functions are served
  //       changeOrigin: true,
  //       // rewrite: (path) => path.replace(/^\/\.netlify\/functions/, ''),
  //     },
  //   },
  // },
});
