import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

const ENV = process.env.ENV || 'local';

const baseURLs = {
  local: 'http://localhost:5173/', 
  production: 'https://ecommerce-react-drift-style.vercel.app/',
};

export default defineConfig({
  testDir: './src/tests', 
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  reporter: [
    ['list'], // Muestra los resultados en la consola
    ['html', { open: 'never' }], // Genera un reporte HTML
    ['junit', { outputFile: 'results.xml' }] // Genera un reporte JUnit
  ],
  use: {
    baseURL: baseURLs[ENV],
    headless: false,
    browserName: 'chromium',
    viewport: { width: 1280, height: 720 },
  },
});