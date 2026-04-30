import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: ['multilobed-scoriaceous-zayden.ngrok-free.dev']
  },
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})
