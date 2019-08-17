import commonjs from "rollup-plugin-commonjs";
// import purgeCss from '@fullhuman/postcss-purgecss';
import livereload from "rollup-plugin-livereload";
import postcss from "rollup-plugin-postcss";
import resolve from "rollup-plugin-node-resolve";
import svelte from "rollup-plugin-svelte";
import { terser } from "rollup-plugin-terser";
//import svelte_preprocess_postcss from "svelte-preprocess-postcss";
import builtins from "rollup-plugin-node-builtins";
import globals from "rollup-plugin-node-globals";
//import copy from "rollup-plugin-copy-assets";
import typescript from "rollup-plugin-typescript2";

import {
  preprocess,
  createEnv,
  readConfigFile
} from "@pyoner/svelte-ts-preprocess";

const production = !process.env.ROLLUP_WATCH;

const env = createEnv();
const compilerOptions = readConfigFile(env);
const opts = {
  env,
  compilerOptions: {
    ...compilerOptions,
    allowNonTsExtensions: true
  }
};

export default {
  input: "src/main.js",
  output: {
    format: "iife",
    sourcemap: true,
    name: "app",
    file: "dist/main.js"
  },

  plugins: [
    svelte({
      dev: !production,
      css: css => {
        css.write("dist/components.css");
      },
      preprocess: preprocess(opts)
    }),
    resolve(),
    commonjs(),
    typescript({
      typescript: require("typescript")
    }),
    globals(),
    builtins(),
    // copy({
    //   assets: ["src/assets"]
    // }),
    postcss({
      extract: true
    }),
    !production && livereload("dist"),
    production && terser()
  ]
  // watch: {
  //    clearScreen: false,
  // },
};
