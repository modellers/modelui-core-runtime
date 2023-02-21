import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import multiInput from 'rollup-plugin-multi-input' //  https://www.npmjs.com/package/rollup-plugin-multi-input
import { terser } from 'rollup-plugin-terser'
import css from 'rollup-plugin-import-css'
import json from '@rollup/plugin-json'
import pkg from './package.json'

// https://dev.to/remshams/rolling-up-a-multi-module-system-esm-cjs-compatible-npm-library-with-typescript-and-babel-3gjg
// https://github.com/rollup/rollup/issues/2106

const extensions = ['.js', '.ts']

export default [
  {
    input: 'src/**/*.js',
    output: [
      {
        dir: 'dist/cjs',
        format: 'cjs',
        sourcemap: true,
        exports: 'auto'
      }
    ],
    plugins: [
      babel({
        babelHelpers: 'bundled',
        extensions,
        exclude: 'node_modules/**',
        presets: ['@babel/preset-env', '@babel/preset-react']
      }),
      resolve(),
      commonjs(),
      // terser(), // create one liner
      multiInput({ relative: 'src/' }),
      css(),
      json()
    ],
    external: Object.keys(pkg.peerDependencies),
    compilerOptions: {
      lib: ['ESNext'], // Why not use NodeNext if it compiles down anyways
      target: 'ES2021',

      // Runtime/Module
      module: 'Node16', // <- ESM Module Type
      moduleResolution: 'Node16', // <- ESM Resolution
      esModuleInterop: false // I added this to show what not to do
    }
  },
  {
    input: 'src/**/*.js',
    output: [
      {
        dir: 'dist/esm',
        format: 'esm',
        sourcemap: true,
        exports: 'auto'
      }
    ],
    plugins: [
      babel({
        babelHelpers: 'bundled',
        extensions,
        exclude: 'node_modules/**',
        presets: ['@babel/preset-env', '@babel/preset-react']
      }),
      resolve(),
      commonjs(),
      // terser(), // create one liner
      multiInput({ relative: 'src/' }),
      css(),
      json()
    ],
    external: Object.keys(pkg.peerDependencies),
    compilerOptions: {
      lib: ['ESNext'], // Why not use NodeNext if it compiles down anyways
      target: 'ES2021',

      // Runtime/Module
      module: 'Node16', // <- ESM Module Type
      moduleResolution: 'Node16', // <- ESM Resolution
      esModuleInterop: false // I added this to show what not to do
    }
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
