const request = require('request')
const _ = require('lodash')


const XLSX = require('xlsx')

const { writeFile } = require('fs').promises

const rule = require('./ruleconfigs.json')

const rule1 = require('./ruleconfigs1.json')


request('https://www.chicme.com/context/anon/get-shipping-policy-info', function (error, response, body) {
  // console.log(JSON.parse(body))

  const infos = JSON.parse(body).result





  const mapedInfos = []
  infos.forEach(info => {

    if (info.standard) {
      mapedInfos.push({
        country: info.country,
        shipping: {
          label: info.standard.label,
          value: 'standard',
          time: info.standard.time,
          desc: info.standard.desc,
          fee: info.standard.free
        }
      })
    }

    if (info.expedited) {
      mapedInfos.push({
        country: info.country,
        shipping: {
          label: info.expedited.label,
          value: 'expedited',
          time: info.expedited.time,
          desc: info.expedited.desc,
          fee: info.expedited.free
        }
      })
    }


    if (info.express) {
      mapedInfos.push({
        country: info.country,
        shipping: {
          label: info.express.label,
          value: 'express',
          time: info.express.time,
          desc: info.express.desc,
          fee: info.express.free
        }
      })
    }


  })



  const ws_data = mapedInfos.map(info => ([
    info.country.value,
    info.country.label,
    info.shipping.label,
    info.shipping.time,
    info.shipping.fee,
    info.shipping.desc
  ]))


  const lines = rule.ruleConfigs

  const lineCells = lines.map(line => ([
    line.country,
    line.rate,
    line.fixedHeavyAmount,
    line.discountRate
  ]))

  const lines1 = rule1.ruleConfigs

  const lineCells1 = lines1.map(line => ([
    line.country,
    line.rate,
    line.fixedHeavyAmount,
    line.initatingWeight,
    line.discountRate
  ]))

  const wb = XLSX.utils.book_new()

  wb.Props = {
    Title: "物流",
    Subject: "Shipping",
    Author: "Shaolei",
    CreatedDate: new Date()
  }

  wb.SheetNames.push("Test Sheet");
  
  const ws = XLSX.utils.aoa_to_sheet(ws_data);

  wb.Sheets["Test Sheet"] = ws


  wb.SheetNames.push("rates")

 


  const ws2 = XLSX.utils.aoa_to_sheet(lineCells)

  wb.Sheets["rates"] = ws2


  wb.SheetNames.push("rates2")

 


  const ws3 = XLSX.utils.aoa_to_sheet(lineCells1)

  wb.Sheets["rates2"] = ws3


  var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' })

  // // 写入文件
  writeFile(`./shippinginfos1.xlsx`, wbout)
    .catch((error) => {
      console.log(error);
    });
})