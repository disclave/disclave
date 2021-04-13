import babel from "@rollup/plugin-babel";
import del from "rollup-plugin-delete";
import dotEnv from "rollup-plugin-dotenv";
import external from "rollup-plugin-peer-deps-external";
import json from "@rollup/plugin-json";
import pkg from "./package.json";
import postcss from "rollup-plugin-postcss-modules";
import typescript from "@rollup/plugin-typescript";
import replace from '@rollup/plugin-replace';

export default {
  input: "src/index.ts",
  output: [
    { dir: ".", entryFileNames: pkg.main, format: "cjs" },
    { dir: ".", entryFileNames: pkg.module, format: "es" },
  ],
  plugins: [
    del({ targets: ["dist/*"] }),
    dotEnv(),
    replace({
      'process.env.IFRAME_URL': process.env.IFRAME_URL
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
