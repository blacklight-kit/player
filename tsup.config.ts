import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    server: 'src/server/index.ts',
    streaming: 'src/streaming/index.ts',
  },
  format: ['esm'],
  outDir: 'dist',
  dts: {
    compilerOptions: {
      types: ['node'],
      skipLibCheck: true,
    },
  },
  clean: false,
  sourcemap: true,
  target: 'es2020',
  external: [],
  async onSuccess() {
    console.log('Server build completed');
  },
});
