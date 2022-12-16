import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import multiInput from 'rollup-plugin-multi-input' //  https://www.npmjs.com/package/rollup-plugin-multi-input
import { terser } from 'rollup-plugin-terser'
import css from 'rollup-plugin-import-css'
import json from '@rollup/plugin-json'
import pkg from './package.json'

// https://github.com/rollup/rollup/issues/2106
export default [
  {
    input: 'src/**/*.js',
    output: {
      dir: 'dist',
      format: 'cjs',
      exports: 'auto'
    },
    plugins: [
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        presets: ['@babel/preset-env', '@babel/preset-react']
      }),
      resolve(),
      commonjs(),
      terser(),
      multiInput({ relative: 'src/' }),
      css(),
      json()
    ],
    external: Object.keys(pkg.peerDependencies)
  },
  {
    input: 'src/**/*.js',
    output: {
      dir: 'dist-dev',
      format: 'cjs',
      compact: false,
      sourcemap: true,
      inputSourceMap: true,
      minifyInternalExports: false,
      sourcemapExcludeSources: false,
      exports: 'auto'
    },
    plugins: [
      babel({
        minified: false,
        compact: false,
        sourceMaps: true,
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        presets: ['@babel/preset-env', '@babel/preset-react']
      }),
      resolve(),
      commonjs(),
      terser(),
      multiInput({ relative: 'src/' }),
      css(),
      json()
    ],
    external: Object.keys(pkg.peerDependencies)
  }
]
