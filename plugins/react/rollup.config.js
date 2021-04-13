import babel from "@rollup/plugin-babel";
import del from "rollup-plugin-delete";
import external from "rollup-plugin-peer-deps-external";
import json from "@rollup/plugin-json";
import pkg from "./package.json";
import postcss from "rollup-plugin-postcss-modules";
import typescript from "@rollup/plugin-typescript";
import { config } from 'dotenv';
import replace from '@rollup/plugin-replace';

const parsed = config().parsed || {};
parsed.IFRAME_URL = parsed.IFRAME_URL || process.env.IFRAME_URL;

export default {
  input: "src/index.ts",
  output: [
    { dir: ".", entryFileNames: pkg.main, format: "cjs" },
    { dir: ".", entryFileNames: pkg.module, format: "es" },
  ],
  plugins: [
    del({ targets: ["dist/*"] }),
    replace({
      process: JSON.stringify({
        env: parsed
     }),
    }),
    postcss({
      extract: false,
      modules: true,
    }),
    external(),
    typescript({
      exclude: ["**/*.test.*", "**/*.stories.*"],
    }),
    babel({
      presets: ["@babel/env", "@babel/preset-react"],
      exclude: "node_modules/**",
      babelHelpers: "bundled",
    }),
    json(),
  ],
  external: Object.keys(pkg.peerDependencies || {}),
};
