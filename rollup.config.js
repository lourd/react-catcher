const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const replace = require('rollup-plugin-replace')
const resolve = require('rollup-plugin-node-resolve')
const uglify = require('rollup-plugin-uglify')

const { NODE_ENV } = process.env

const config = {
  input: 'index.js',
  output: {
    name: 'Catcher',
    globals: {
      react: 'React',
    },
  },
  external: ['react'],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    }),
    commonjs({
      include: /node_modules/,
    }),
  ],
}

if (NODE_ENV === 'production') {
  config.plugins.push(uglify())
}

module.exports = config
