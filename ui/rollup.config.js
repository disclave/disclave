import * as path from "path";
import babel from '@rollup/plugin-babel';
import external from 'rollup-plugin-peer-deps-external';
import del from 'rollup-plugin-delete';
import pkg from './package.json';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import postcssImport from 'postcss-import';


export default {
  input: pkg.source,
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'esm' }
  ],
  plugins: [
    external(),
    babel({
      presets: ["@babel/env", "@babel/preset-react"],
      exclude: 'node_modules/**',
      babelHelpers: 'bundled'
    }),
    del({ targets: ['dist/*'] }),
    typescript(),
    postcss({
      extensions: ['.css'],
      extract: path.resolve('dist/index.css'),
      // modules: true,
      minimize: true,
      config: {
        path: './postcss.config.js'
      },
      plugins: [
        postcssImport()
      ]
    }),
  ],
  external: Object.keys(pkg.peerDependencies || {}),
};