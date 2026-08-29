import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Folio Vitae',
        short_name: 'Folio Vitae',
        description: 'Build an elegant developer portfolio in minutes',
        theme_color: '#0b0f1a',
        background_color: '#0b0f1a',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
      },
      devOptions: { enabled: true, type: 'module' },
    }),
    viteSingleFile(), // inlines all JS + CSS into one index.html
  ],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    target: 'esnext',
    assetsInlineLimit: 100000000, // inline everything
    cssCodeSplit: false,
    outDir: 'dist',
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
})
