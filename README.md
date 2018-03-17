## 配置
### 日期配置
```javascript
// 路径：/config/time.js
module.exports = [
  '2018-03-17',
  '2018-03-18',
  '2018-03-19',
  '2018-03-25',
  '2018-03-26',
  '2018-03-30',
  '2018-03-31',
  '2018-04-01',
  '2018-04-02',
  '2018-04-04'
]
```

* 格式是`年-月-日`
* 不要填过期的时间

### 酒店列表配置
```javascript
// 路径：/config/list.js
module.exports = [
  {
    hotel: '三亚亚龙湾假日度假酒店',  // 酒店名
    seller: '三亚梦时光旅游专营店',   // 供应商名称
    city: '三亚',                  // 城市
    code: '460200'                // 城市code
  },
  {
    hotel: '三亚湾红树林度假世界（木棉酒店）',
    seller: '三亚梦时光旅游专营店',
    city: '三亚',
    code: '460200'
  }
]
```

#### `城市`和`城市code`从以下方式获得
1. 打开[网页](https://h5.m.taobao.com/trip/hotel/searchlist/index.html)
2. 点击左上角的城市，选择对应城市
3. 选中城市后，浏览器地址栏中会出现以下url
https://h5.m.taobao.com/trip/hotel/searchlist/index.html?_projVer=1.0.12&isOneSearch=false&guid=1521270890646786407&checkIn=2018-04-01&checkOut=2018-04-02&`cityCode=469005&cityName=文昌市`&isLBS=false&ttid=201300@travel_h5_3.1.0
4. 其中`cityName`就是城市名，`cityCode`就是城市code

## 运行
1. 运行命令行
2. 到所在目录
3. 执行`npm run start`

## 结果
目录：`/result/craw.xslx`

## 排查
* 可能会出现某个酒店查不到结果的情况，这时候可以自己去飞猪按给的条件搜索，看是否能查到结果，如果不能就检查下是否酒店名字有错
