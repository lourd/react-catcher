const fs = require('fs')
const path = require('path')
const execSync = require('child_process').execSync
const prettyBytes = require('pretty-bytes')
const gzipSize = require('gzip-size')

process.chdir(path.resolve(__dirname, '..'))

const exec = (command, extraEnv) =>
  execSync(command, {
    stdio: 'inherit',
    env: Object.assign({}, process.env, extraEnv),
  })

const filename = 'react-catcher'

console.log('\nBuilding UMD modules...')

exec(`rollup -c -f umd -o dist/${filename}.js`, {
  NODE_ENV: 'development',
})

exec(`rollup -c -f umd -o dist/${filename}.min.js`, {
  NODE_ENV: 'production',
})

const minifiedFile = fs.readFileSync(`dist/${filename}.min.js`)
const minifiedSize = prettyBytes(minifiedFile.byteLength)
const gzippedSize = prettyBytes(gzipSize.sync(minifiedFile))
console.log(
  `\nThe minified UMD build is ${minifiedSize} (${gzippedSize} gzipped)`,
)
