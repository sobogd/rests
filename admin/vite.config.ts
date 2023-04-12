import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: './build'
  },
  resolve: {
    alias: [
      { find: 'app', replacement: path.resolve(__dirname, 'src/app') },
      { find: 'entities', replacement: path.resolve(__dirname, 'src/entities') },
      { find: 'shared', replacement: path.resolve(__dirname, 'src/shared') },
      { find: 'pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: 'slices', replacement: path.resolve(__dirname, 'src/slices') },
      { find: 'api', replacement: path.resolve(__dirname, 'src/api') },
      { find: 'utils', replacement: path.resolve(__dirname, 'src/utils') },
      { find: 'config', replacement: path.resolve(__dirname, 'src/config') },
      { find: 'features', replacement: path.resolve(__dirname, 'src/features') },
      { find: 'hooks', replacement: path.resolve(__dirname, 'src/hooks') },
    ],
  },
})
