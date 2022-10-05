import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/vue/index.ts'],
  dts: true,
  format: ['cjs', 'esm'],
  shims: true,
  clean: true,
})
