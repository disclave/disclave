import babel from "@rollup/plugin-babel";
import external from "rollup-plugin-peer-deps-external";
import del from "rollup-plugin-delete";
import dotEnv from "rollup-plugin-dotenv";
import pkg from "./package.json";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";

export default {
  input: pkg.source,
  output: [
    { dir: ".", entryFileNames: pkg.main, format: "cjs" },
    { dir: ".", entryFileNames: pkg.module, format: "es" },
  ],
  plugins: [
    del({ targets: ["dist/*"] }),
    dotEnv(),
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
