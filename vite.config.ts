import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    tailwindcss(),
  ],
  base: command === 'build' ? '/Mema/' : '/',
  esbuild: {
    jsx: 'automatic'
  }
}))
