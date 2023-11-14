import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), WindiCSS()],
  server: {
    port:8082
  },
  /*server: {
    host: '0.0.0.0',
    port: 10130,
    hmr: {
      host: 'cc221009-10130.node.fhstp.io',
      protocol: 'wss',
      port: 10130,
    },
  },*/

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }

}})
