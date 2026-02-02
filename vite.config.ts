import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/maca-quiz-app/',
  plugins: [react()],
  css: {
    devSourcemap: false,
  },
})
