import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    include: "**/*/.jsx",
  })],
  server: {
    host: true,
    port: 3000,
    //Windows fix
    watch: {
      usePolling: true 
    }
  }
})
