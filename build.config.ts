import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    './src/index',
    {
      builder: 'mkdist',
      input: './src/vue/',
      outDir: './vue',
    },
    {
      builder: 'mkdist',
      input: './src/vue/',
      outDir: './vue',
      format: 'cjs',
      ext: 'cjs',
    },
  ],
  declaration: true,
  rollup: {
    emitCJS: true,
  },
  clean: true,
})
