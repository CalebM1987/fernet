import esbuild from 'esbuild'
import { resolve } from 'path'

const configs: esbuild.BuildOptions[] = [
  {
    format: 'cjs',
    entryPoints: [resolve('src/index.ts')],
    bundle: true,
    outdir: resolve('dist/cjs')
  },
  {
    format: 'esm',
    entryPoints: [resolve('src/index.ts')],
    bundle: true,
    outdir: resolve('dist/esm')
  },
  {
    format: 'iife',
    entryPoints: [resolve('src/index.ts')],
    bundle: true,
    outdir: resolve('dist/iife'),
    minify: true
  }
]

// build all formats
for (const config of configs){
  esbuild.build({
    minify: true,
    ...config
  })
}