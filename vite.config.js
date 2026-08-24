import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
   // ✅ Server settings for mobile device access
  server: {
    host: '0.0.0.0',         // Listen on all IPs (so mobile can access it)
    port: 5178,              // Website (admin panel runs on 5177)
    // strictPort: true,        // Error if 5173 is taken instead of using a random one
  },
})