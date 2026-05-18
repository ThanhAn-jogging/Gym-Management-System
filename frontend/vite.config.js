import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Import bản tích hợp mới

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Kích hoạt Tailwind trực tiếp tại đây
  ],
})