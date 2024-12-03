import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Otras configuraciones existentes...
  preflight: true,
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  theme: {
    extend: {
      tokens: {
        colors: {
          // Colores principales
          primary: { value: '#FF6B6B' },
          secondary: { value: '#4ECDC4' },
          
          // Fondo
          background: {
            DEFAULT: { value: '#ffffff' },
            dark: { value: '#121212' }
          },
          
          // Texto
          text: {
            DEFAULT: { value: '#1a1a1a' },
            dark: { value: '#ffffff' }
          },
          
          // Componentes
          card: {
            DEFAULT: { value: '#ffffff' },
            dark: { value: '#1e1e1e' }
          },
          
          // Bordes
          border: {
            DEFAULT: { value: '#e5e5e5' },
            dark: { value: '#2e2e2e' }
          },
          
          // Input
          input: {
            DEFAULT: { value: '#ffffff' },
            dark: { value: '#2a2a2a' }
          },
          
          // Hover states
          hover: {
            DEFAULT: { value: '#f5f5f5' },
            dark: { value: '#2a2a2a' }
          }
        }
      },
      semanticTokens: {
        colors: {
          // Tokens semánticos para el modo oscuro
          'app-bg': {
            DEFAULT: { value: '{colors.background.DEFAULT}' },
            _dark: { value: '{colors.background.dark}' }
          },
          'app-text': {
            DEFAULT: { value: '{colors.text.DEFAULT}' },
            _dark: { value: '{colors.text.dark}' }
          },
          'card-bg': {
            DEFAULT: { value: '{colors.card.DEFAULT}' },
            _dark: { value: '{colors.card.dark}' }
          },
          'border-color': {
            DEFAULT: { value: '{colors.border.DEFAULT}' },
            _dark: { value: '{colors.border.dark}' }
          },
          'input-bg': {
            DEFAULT: { value: '{colors.input.DEFAULT}' },
            _dark: { value: '{colors.input.dark}' }
          },
          'hover-bg': {
            DEFAULT: { value: '{colors.hover.DEFAULT}' },
            _dark: { value: '{colors.hover.dark}' }
          }
        }
      }
    }
  },
  conditions: {
    dark: '[data-theme="dark"] &',
    light: '[data-theme="light"] &'
  },
  utilities: {
    extend: {
      darkMode: {
        className: 'dark-theme'
      }
    }
  },
  darkMode: 'class',
  jsxFramework: 'react'
});

