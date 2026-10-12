import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    // Inline (empty) PostCSS config: stops Vite searching parent folders, where an
    // unrelated postcss.config.mjs at the drive root would otherwise be picked up.
    postcss: {},
  },
})
