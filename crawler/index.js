const superagent = require('superagent')
const cheerio = require('cheerio')
const excel = require('excel4node')

const baseURL = 'https://www.justfashionnow.com/'

var browserMsg={
  "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36"
}

const getData = (url) => {
  return new Promise(function(resolve, reject){
    superagent.get(url)
    .set(browserMsg)
    .end((err, res) => {
      

      if(err){
        reject(err)
      }else{
        resolve(res)
      }
      
    })
  })
}


const analysisListingUrl = (data) => {
  let urls = []
  let $  = cheerio.load(data)
  let listingitem = $('.listing-item')
  listingitem.each(function(i, e){
    let href = $(e).find('a').attr('href')
    urls.push(`${baseURL}${href}`)
  })
  return urls
}

const analysisProduct = (data) => {
  let $  = cheerio.load(data)
  var $scripts = $('html').find('script')
  let scriptText, productDetail, stocks, sizes, colors
  for(let i=0, len= $scripts.length; i< len; i++){
    let $script = $scripts.get()[i];
    if($script && $script.children && $script.children.length){
      scriptText = $script.children[0].data

      if (scriptText.match('window.product_detail')){
        let as = scriptText.split('window.product_detail =')
         
        let st = as[1]

        let obs = st.split('|| [];')
        productDetail = JSON.parse(obs[0])

        let stockText = as[0]

        stockText = stockText.replace('window.originStock = ','')

        let stcs = stockText.split('|| [];')

        stocks = JSON.parse(stcs[0])

        console.log(stocks[0])

        sizes = stocks.map( s => s.label_size)
        colors = stocks.map( s => s.color_title)

        productDetail.sizes = sizes.filter( (s, i) => sizes.indexOf(s) === i  ).join(';')
        productDetail.colors = colors.filter( (s, i) => colors.indexOf(s) === i  ).join(';')
        productDetail.image = `https://www.justfashionnow.com${productDetail.image}`
        
      }

      

      
    }
    
  }

  return productDetail
}


let cells = ['sku', 'name','sizes','colors', 'price', 'special', 'image', 'url']
const workbook = new excel.Workbook()
const worksheet = workbook.addWorksheet('Sheet 1')

const setTitles = () => {
  for(let j=0, jen= cells.length; j< jen; j++){
    worksheet.cell(1,j+1).string(cells[j])
  }
  workbook.write('report.xlsx')
}

const pullList = (page) => {
  getData(`${baseURL}shop/best-sellers-womens-shoes-11878/page-${page}.html`).then(function(res){
  
    let urls = analysisListingUrl(res.text)
    if(urls && urls.length){
      for(let i=0, len= urls.length, url; i< len; i++){
        url = urls[i];
        getData(url).then(function(res){
          let product = analysisProduct(res.text)
          product.url = url
          for(let j=0, jen= cells.length; j< jen; j++){
            worksheet.cell(i+((page-1)*48)+2,j+1).string(product[cells[j]] + '')
          }
          workbook.write('report.xlsx')
        })
      }
    }
    
  
  })
}

setTitles()

for(var i=1; i< 7;i++){
  pullList(i)
}






