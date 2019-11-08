
const superagent = require('superagent')
const excel = require('excel4node')

const getData = (url, browserMsg) => {
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




/**
 * 
 * @param {*} cells {label, value}
 * @param {*} list 
 */

const exportExcel = (cells, list, page, file= `crawler${Date.now()}`) => {
  const workbook = new excel.Workbook()
  const worksheet = workbook.addWorksheet('Sheet 1')
  setTitles(workbook, worksheet, cells, file)
  setList(workbook, worksheet, cells, list, page, file)
}

const setTitles = (workbook, worksheet, cells, file) => {
  for(let i=0, len= cells.length; i< len; i++){
    worksheet.cell(1,i+1).string(cells[i].label)
  }
  workbook.write(file)
}

const isObj = (obj) => {
  return obj && (typeof obj === 'object' || Array.isArray(obj))
}

const setList = (workbook, worksheet, cells, list, page, file) => {
  let element
  for(let row=0, ren= list.length; row < ren; row++){
    element= list[row]
    let cole
    for(let col=0, cen= cells.length; col < cen; col++){
      cole = element[cells[col].value]
      if(isObj(cole)) cole = JSON.stringify(cole)
      else cole = cole + ''
      worksheet.cell(row+((page-1)*48)+2,col+1).string(cole)
    }
  }
  workbook.write(file)
}

module.exports = {
  getData,
  exportExcel
}