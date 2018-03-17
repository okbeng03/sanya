const cheerio = require("cheerio")

function crawTest (browser, hotel, start, end, dayData) {
  const hotelName = hotel.hotel
  const hotelSeller = hotel.seller
  const url = `https://h5.m.taobao.com/trip/hotel/searchlist/index.html
    ?cityName=${hotel.city}&cityCode=${hotel.code}&adultNum=2&keyWords=${hotelName}&checkIn=${start}&checkOut=${end}`
  const data = {
    date: `${start}_${end}`
    // name: hotelName,
    // date: `${start}~${end}`
  }

  console.log(`start craw hotel: ${hotelName}, url: ${url}`)

  browser
    .url(url)
    .waitForElementVisible('body', 1000)
    .click('div.card-standard-wrap:first-child div.card-standard')
    .waitForElementVisible('body', 1000)
    .source(function (content) {
      const $ = cheerio.load(content.value)
      const typeItems = $('div.hotel div.room-type-wrap')
      const typeLists = []

      typeItems.each(function (i, wrap) {
        const typeItem = {
          lowerList: []
        }
        const itemElem = $('div.room-type-item', wrap)
        const listElem = $('div.room-rate-list div.room-rate', wrap)

        typeItem.title = $('div.room-desc-title', itemElem).text()
        typeItem.price = parseFloat($('div.book-price-wrap em.money', itemElem).text())

        const rateList = [] 

        listElem.each(function (j, elem) {
          const rate = {}
          const seller = $('p.room-rate-seller span', elem).text()
          const price = $('div.price em.money', elem).text()

          if (hotelSeller === seller && !typeItem.myPrice) {
            typeItem.myPrice = parseFloat(price)
          } else {
            rate.seller = seller
            rate.price = parseFloat(price)

            rateList.push(rate)
          }
        })

        if (typeItem.myPrice) {
          rateList.forEach(function (item) {
            if (item.price < typeItem.myPrice) {
              typeItem.lowerList.push(item)
            }

            if (item.price < typeItem.price) {
              typeItem.price = item.price
            }
          })
        }

        if (typeItem.myPrice && typeItem.myPrice > typeItem.price) {
          typeLists.push(typeItem)
        }
      })

      data.list = typeLists
    })

  // browser.screenshot(true)
  browser.end()

  dayData.list.push(data)
  console.log(`finish craw hotel: ${hotelName}, url: ${url}`)
}

module.exports = crawTest
