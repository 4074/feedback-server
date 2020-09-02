/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
// const tsConfig = require('./tsconfig.json')

const root = path.resolve(__dirname, 'build')

function resolve(folder) {
  const items = fs.readdirSync(folder)
  for (const item of items) {
    const p = path.resolve(folder, item)
    const stat = fs.lstatSync(p)
    if (stat.isDirectory()) {
      resolve(p)
    } else if (/\.js$/.test(item)) {
      const file = fs.readFileSync(p).toString()
      const r = path.relative(p, root).replace(/^\./, '').replace(/\\/g, '/')
      // console.log(p, root, r)
      if (/@server/.test(file)) {
        const nf = file.replace(/(require\(")@server/g, `$1${r}`)
        // console.log(p, nf)
        fs.writeFileSync(p, nf)
      }
    }
  }
  // console.log(items)
}

resolve(root)
