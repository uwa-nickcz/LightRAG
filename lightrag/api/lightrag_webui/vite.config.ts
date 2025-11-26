import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// Define webuiPrefix directly in the config file
const webuiPrefix = '/webui/'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  base: webuiPrefix,
  build: {
    outDir: path.resolve(__dirname, '../webui'),
    emptyOutDir: true,
    chunkSizeWarningLimit: 3800,
    rollupOptions: {
      // Let Vite handle chunking automatically to avoid circular dependency issues
      output: {
        // Ensure consistent chunk naming format
        chunkFileNames: 'assets/[name]-[hash].js',
        // Entry file naming format
        entryFileNames: 'assets/[name]-[hash].js',
        // Asset file naming format
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  },
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true
      }
    }
  }
})