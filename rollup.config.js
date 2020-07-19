import sass from 'rollup-plugin-sass'
import typescript from 'rollup-plugin-typescript2'
import postcss from 'rollup-plugin-postcss'
import commonjs from '@rollup/plugin-commonjs';

import pkg from './package.json'

export default {
    input: 'src/index.tsx',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        exports: 'named',
        sourcemap: true,
        strict: false
      }
    ],
    plugins: [
      sass({ insert: true }),
      postcss({
        plugins: []
      }),
      typescript({ useTsconfigDeclarationDir: true }),
      commonjs()
    ],
    external: ['react', 'react-dom', 'bizcharts', '@antv/data-set', 'prop-types']
}