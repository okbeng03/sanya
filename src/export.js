const fs = require('fs')
const path = require('path')
const XLSX = require('xlsx')

const root = path.resolve(__dirname, '../result')

function getData () {
  let result = []
  const dirList = fs.readdirSync(root)

  dirList.forEach(function (fileName) {
    const hotel = getHotel(fileName)

    if (hotel) {
      result = result.concat(hotel)
    }
  })

  return result
}

function getHotel (fileName) {
  if (path.extname(fileName) !== '.json') {
    return
  }

  const data = require(path.resolve(root, fileName))
  const hotelName = data.name
  const seller = data.seller

  if (data.list.length) {
    const list = []
    const dateList = data.list

    dateList.forEach(function (date) {
      const time = date.date.split('_')
      const start = time[0]
      const end = time[1]

      date.list.forEach(function (item) {
        list.push([
          hotelName,
          start,
          end,
          item.title,
          seller,
          item.myPrice,
          item.price,
          item.lowerList[0] ? item.lowerList[0].seller : ''
        ])
      })
    })

    if (list.length) {
      return list
    }
  }

  return;
}

module.exports = function () {
  // 读取每个文件，去除结果
  const data = getData()
  data.unshift([
    '酒店',
    '开始日期',
    '结束日期',
    '房型',
    '我的供应商',
    '我的价格',
    '最低价',
    '最低价供应商'
  ])
  const ws = XLSX.utils.aoa_to_sheet(data, {
    cellDates: true,
    sheetStubs: [
      {
        t: 's'
      },
      {
        t: 'd'
      },
      {
        t: 'd'
      },
      {
        t: 's'
      },
      {
        t: 's'
      },
      {
        t: 'n'
      },
      {
        t: 'n'
      },
      {
        t: 's'
      }
    ]
  })
  const wb = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(wb, ws, 'craw')
  XLSX.writeFile(wb, path.resolve(root, 'craw.xlsx'), {})
}
