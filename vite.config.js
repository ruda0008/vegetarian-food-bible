
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/vegetarian-food-bible/',
  plugins: [react()],
})