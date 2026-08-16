import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // host: true = เปิดให้เครื่องอื่นในวง Wi-Fi เดียวกันเข้าได้
  // เปิดบนมือถือจริงด้วย http://<IP เครื่องนี้>:5180
  server: { port: 5180, open: true, host: true },
})
