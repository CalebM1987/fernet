import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'
console.log('rollup config running')
const pkg = require('./package.json')
const name = pkg.main.replace(/\.js$/, '')

const bundle = config => ({
    ...config,
    input: 'src/index.ts',
    external: id => !/^[./]/.test(id),
})

export default [
    bundle({
        // define: {
        //     __VERSION__: pkg.version
        // },
        plugins: [esbuild({
            optimizeDeps: {
                bundle: true
            }
        })],
        output: [
            {
                file: `${name}.js`,
                format: 'cjs',
                sourcemap: true,
            },
            {
                file: `${name}.mjs`,
                format: 'es',
                sourcemap: true,
            },
        ],
    }),
    bundle({
        plugins: [dts()],
        output: {
            file: `${name}.d.ts`,
            format: 'es',
        },
    }),
]