import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

const PWAPlugins = VitePWA({
  srcDir: 'src',
  filename: 'service-worker.js',
  workbox: { globPatterns: ['**/*'], maximumFileSizeToCacheInBytes: 5_000_000 },
  includeAssets: ['**/*'],
  includeManifestIcons: true,
  injectManifest: { maximumFileSizeToCacheInBytes: 5_000_000 },
  strategies: 'injectManifest',
  injectRegister: 'auto',
  registerType: 'autoUpdate',
  devOptions: { enabled: true, type: 'module' },
  manifest: {
    short_name: 'Demo App',
    name: 'Demo Vite PWA',
    icons: [
      {
        src: 'favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
    start_url: '.',
    display: 'standalone',
    theme_color: '#000000',
    background_color: '#ffffff',
    protocol_handlers: [{ protocol: 'web+tmed', url: '/command?q=%s' }],
  },
});

export default defineConfig({
  appType: 'spa',
  root: './',
  build: { outDir: './build' },
  plugins: [react(), PWAPlugins, tsconfigPaths({ loose: true }), svgr()],
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
});
