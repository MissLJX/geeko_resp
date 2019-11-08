const superagent = require('superagent')
const cheerio = require('cheerio')
const {getData, exportExcel} = require('./source')

const baseURL = 'https://www.justfashionnow.com'

const browserMsg={
  "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36"
}

const analysisListingUrl = (data) => {
  let urls = []
  let $  = cheerio.load(data)
  let listingitem = $('.listing-item')
  listingitem.each(function(i, e){
    let href = $(e).find('a').attr('href')
    urls.push(`${baseURL}/${href}`)
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
        sizes = stocks.map( s => s.label_size)
        colors = stocks.map( s => s.color_title)

        productDetail.sizes = sizes.filter( (s, i) => sizes.indexOf(s) === i  )
        productDetail.colors = colors.filter( (s, i) => colors.indexOf(s) === i  )
        productDetail.image = `${baseURL}${productDetail.image}`
        productDetail.images = productDetail.images.map(image => `${baseURL}${image}`)
        
        let variants = stocks.map( s => {
          let images = productDetail.images.filter( image => image.option_value_id === s.color_option_value_id)
          return {
            color: s.color_title,
            size: s.label_size,
            images: images ? images.map( i => `${baseURL}${i.image}` ): []
          }
        })
        productDetail.variants = variants

      }

      

      
    }
    
  }

  return productDetail
}

async function pull(count){
  const products= []
  for(let page=1; page<= count; page++){
    console.log(`第${page}页正在拉取...........................`)
    let data = await getData(`${baseURL}/shop/best-sellers-womens-shoes-11878/page-${page}.html`, browserMsg).catch((err) => {
      console.log(err)
    })

    if(data){
      let urls = analysisListingUrl(data.text)
      let productPage, url, product
      for(let i= 0, len= urls.length; i< len; i++){
        url= urls[i]
        productPage = await getData(url, browserMsg).catch((err) => {
          console.log(err)
        })
        if(productPage){
          product = analysisProduct(productPage.text)
          product.url = url
          products.push(product)
        }
      }
    }

    
  }

  exportExcel([
    {label:'名称', value: 'name'},
    {label:'Sku', value: 'sku'},
    {label: '尺码', value: 'sizes'},
    {label: '颜色', value: 'colors'},
    {label: '售价', value: 'price'},
    {label: '促销价格', value: 'special'},
    {label: '主图', value: 'image'},
    {label: '附图', value: 'images'},
    {label: '子产品', value: 'variants'},
    {label: '产品地址', value: 'url'},
    {label: '描述', value: 'product_detail'}

  ], products, 1, `justfashionnow-${Date.now()}.xlsx`)
}


pull(6)