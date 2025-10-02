import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variables.scss" as *;`,
      },
    },
  },
  build: {
    cssCodeSplit: true,  
    minify: 'esbuild',  
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash].css',
      },
    },
  },
  ssr: {
    noExternal: ['react-router-dom'],
  },
});
