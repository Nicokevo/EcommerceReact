import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';

// Obtener el equivalente a __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@pandacss/dev'],
  },
  resolve: {
    alias: {
      '@styled-system': path.resolve(__dirname, 'src/styled-system'),
    },
  },
  build: {
    outDir: 'dist', // Carpeta donde Vite genera los archivos de producción
  },
  server: {
    // Permite que las rutas sean redirigidas correctamente
    historyApiFallback: true,
  },
  preview: {
    // Configura el servidor de "preview" después del build
    historyApiFallback: true,
  },
});
