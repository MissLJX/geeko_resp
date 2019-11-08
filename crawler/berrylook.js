const superagent = require('superagent')
const cheerio = require('cheerio')
const {getData, exportExcel} = require('./source')

const baseURL = 'https://www.berrylook.com'

const browserMsg={
  "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36"
}

const analysisListingUrl = (data) => {
  let urls = []
  let $  = cheerio.load(data)
  let listingitem = $('.productlist > .product-item')
  listingitem.each(function(i, e){
    let href = $(e).find('a').attr('href')
    urls.push(`${baseURL}/${href}`)
  })
  return urls
}

const analysisProduct = (data) => {
  let $  = cheerio.load(data)
  let name = $('h1.product-title').text()
  let price = $('.market-price').data('price')
  let special = $('.sale-price').data('price')

  let $colorlist = $('.color__list> .color-item'), colors= []

  $colorlist.each((i, color)=> {
    colors.push($(color).data('value'))
  })


  let $sizelist = $('.size__list> .size-item'), sizes= []

  $sizelist.each((i, size)=> {
    sizes.push($(size).data('value'))
  })

  let $table = $('.detail-item__content>table>tbody')

  let $rows = $table.children('tr')

  let product_detail= []
  $rows.each((i, row) => {
    product_detail.push({
      label: $(row).children('td').eq(0).text(),
      value: $(row).children('td').eq(1).text()
    })
  })

  let image = `https:${$('#bigImg').attr('src')}`.split('?')[0]


  let $images = $('.small-img .pr')

  let images = []

  $images.each((i, e) => {
    var $this = $(e)
    let image = {
      color: $this.data('color'),
      image: `https:${$this.data('big')}`.split('?')[0]
    }
    images.push(image)
  })



  let oImages = [], oColors = []

  images.forEach(image => {
    let index = oColors.indexOf(image.color)
    if(index >= 0){
      oImages[index].images.push(image.image)
    }else{
      oColors.push(image.color)
      oImages.push({
        color: image.color,
        images: [image.image]
      })
    }
  })

  let variants = []

  oImages.forEach((image, index) => {
    sizes.forEach( size => {
      variants.push({
        size,
        color: image.color,
        images: image.images
      })
    })
  })


  return {
    name,
    price,
    special,
    colors,
    sizes,
    product_detail,
    image,
    images: images.map( image => `https:${image.image}`),
    variants
  }
}

async function pull(count){
  const products= []
  for(let page=1; page<= count; page++){
    console.log(`正在爬去第${page}页数据。。。。`)
    let data = await getData(`${baseURL}/en/flat-loafers-6/?&p=${page}`, browserMsg).catch((err) => {
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
    {label: '图片', value: 'image'},
    {label: '产品地址', value: 'url'},
    {label: '描述', value: 'product_detail'},
    {label: '附图', value: 'images'},
    {label: '子产品', value: 'variants'},
  ], products, 1, `berrylook-${Date.now()}.xlsx`)
}


pull(2)