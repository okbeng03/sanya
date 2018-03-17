const fs = require('fs')
const path = require('path')
const spawn = require('cross-spawn')
const export2Excel = require('./src/export')

const root = path.resolve(__dirname, 'result')
let opts = process.argv.slice(2)
const startTime = new Date().getTime()

// 清空目录
const dirList = fs.readdirSync(root)

dirList.forEach(function (fileName) {
  fs.unlinkSync(path.resolve(root, fileName))
})

if (opts.indexOf('--config') === -1) {
  opts = opts.concat(['--config', 'nightwatch.conf.js'])
}

if (opts.indexOf('--env') === -1) {
  opts = opts.concat(['--env', 'chrome'])
}

const runner = spawn('./node_modules/.bin/nightwatch', opts, { stdio: 'inherit' })

runner.on('exit', function (code) {
  exportToExcel()
})

runner.on('error', function (err) {
  throw err
})

// exportToExcel()

// 所有爬取完，转成Excel
function exportToExcel () {
  console.log('------start convert to excel------')

  export2Excel()

  console.log('------finish convert to excel------', new Date().getTime() - startTime)

  process.exit()
}
