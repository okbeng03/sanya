const fs = require('fs')
const path = require('path')
const moment = require('moment')
const crawList = require('../config/list')
const crawTime = require('../config/time')
const crawTest = require('../src/craw')

const tests = {}
const len = crawList.length
const crawData = []
const root = path.resolve(__dirname, '../result')
const spit = Math.floor(len / 5)

crawList.slice(spit * 1, spit * 2).forEach(function (hotel) {
  const hotelName = hotel.hotel
  const result = {
    name: hotelName,
    seller: hotel.seller,
    list: []
  }

  for (let i = 0, len = crawTime.length; i < len; i++) {
    const item = crawTime[i]

    tests[`${hotelName}_${item}`] = function (browser) {
      const start = moment(item, 'YYYY-MM-DD').format('YYYY-MM-DD')
      const end = moment(item, 'YYYY-MM-DD').add(1, 'days').format('YYYY-MM-DD')
  
      crawTest(browser, hotel, start, end, result)
    }
  }

  tests[`${hotelName}_end`] = function () {
    const fileName = `${hotelName}_${moment().format('YYYY-MM-DD')}.json`

    fs.writeFile(path.resolve(root, fileName), JSON.stringify(result, undefined, 2), {
      encoding: 'utf8'
    }, function (err) {
      if (err) throw err;
      
      console.log(`end craw hotel: ${hotelName}`)
    })
  }
})

module.exports = tests
