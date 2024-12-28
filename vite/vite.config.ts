import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import packageJson from '../package.json';

process.env.VITE_APP_VERSION = packageJson.version;
const env = loadEnv('development', path.resolve('./vite'), '');
const { PORT } = env;

export default defineConfig({
  base: './',
  envDir: './vite',
  build: {
    outDir: './build',
  },
  plugins: [
    react(),
    checker({
      typescript: true,
    }),
  ],
  server: {
    port: +PORT,
    open: true,
  },
  resolve: {
    alias: {
      '@app': '/src/app',
      '@client': '/src/app/common/client',
      '@server': '/src/app/common/server',
      '@components': '/src/components',
      '@constants': '/src/constants',
      '@contexts': '/src/contexts',
      '@hooks': '/src/hooks',
      '@router': '/src/router',
      '@services': '/src/services',
      '@styles': '/src/styles',
      '@utils': '/src/utils',
      '@views': '/src/views',
    },
  },
});
