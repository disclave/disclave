import * as path from "path";
import babel from "@rollup/plugin-babel";
import external from "rollup-plugin-peer-deps-external";
import del from "rollup-plugin-delete";
import pkg from "./package.json";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import postcssImport from "postcss-import";

export default {
  input: pkg.source,
  output: [
    { dir: ".", entryFileNames: pkg.main, format: "cjs", sourcemap: true },
    { dir: ".", entryFileNames: pkg.module, format: "es", sourcemap: true },
  ],
  plugins: [
    del({ targets: ["dist/*"] }),
    external(),
    typescript({
      exclude: ["**/*.test.*", "**/*.stories.*"],
    }),
    babel({
      presets: ["@babel/env", "@babel/preset-react"],
      exclude: "node_modules/**",
      babelHelpers: "bundled",
    }),
    postcss({
      extensions: [".css"],
      extract: path.resolve("dist/index.css"),
      minimize: true,
      config: {
        path: "./postcss.config.js",
      },
      plugins: [postcssImport()],
    }),
  ],
  external: Object.keys(pkg.peerDependencies || {}),
};
