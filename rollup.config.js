'use strict'
import buble from '@rollup/plugin-buble'
import {terser} from 'rollup-plugin-terser'
import cleanup from 'rollup-plugin-cleanup'
import json from '@rollup/plugin-json'
import * as pkg from "./package.json";

const year = (new Date).getFullYear()

const banner = `/*!
* CubicBezier Easing v${pkg.version} (${pkg.homepage})
* Copyright 2015-${year} © ${pkg.author}
* ${pkg.description}
* Licensed under MIT (https://github.com/thednp/CubicBezier/blob/master/LICENSE)
*/`

const miniBanner = `// CubicBezier Easing v${pkg.version} | ${pkg.author} © ${year} | ${pkg.license}-License`
// set config
const MIN = process.env.MIN === 'true' // true/false|unset
const FORMAT = process.env.FORMAT // umd|iife|esm|cjs

const INPUTFILE = process.env.INPUTFILE ? process.env.INPUTFILE : 'index.js'
const OUTPUTFILE = process.env.OUTPUTFILE ? process.env.OUTPUTFILE : (FORMAT === 'umd' ? './dist/cubic-bezier'+(MIN?'.min':'')+'.js' : './dist/cubic-bezier.esm'+(MIN?'.min':'')+'.js')

const OUTPUT = {
  file: OUTPUTFILE,
  format: FORMAT, // or iife
}

const PLUGINS = [
  json(),
  buble(),
  cleanup()
]

if (MIN){
  PLUGINS.push(terser({output: {preamble: miniBanner}}));
} else {
  OUTPUT.banner = banner;
  // PLUGINS.push(cleanup());
}

if (FORMAT!=='esm') {
  OUTPUT.name = 'dll';
}

export default [
  {
    input: INPUTFILE,
    output: OUTPUT,
    plugins: PLUGINS
  }
]