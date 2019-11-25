import React from 'react'

const __Type_Header__ = 'typeheader'
const __Type_Size__ = 'typesize'
const __Type_Detail__ = 'typedetail'
const __Type_Dsc__ = 'typedsc'
const __Type_Tip__ = 'typetip'

export default class extends React.Component{
  constructor(props){
    super(props)
    this.id = 0
    this.state = {
      dsc:'',
      tips:[{
        id: this.getId(),
        value: 'Due to the many variations in monitors, the color in the image could look slightly different, please take physical design and color shall prevail.'
      },{
        id: this.getId(),
        value: 'Please allow 0.4"-1" differs due to manual measurement.'
      }],
      details:[],
      sizeheaders:[{
        id: this.getId(),
        value: 'Size(Inch)'
      },{
        id: this.getId(),
        value: 'Bust'
      },{
        id: this.getId(),
        value: 'Waist'
      },{
        id: this.getId(),
        value: 'Length'
      }],
      sizes: []
    }
    
  }

  componentDidMount(){
    const initalSizes = ['S','M','L','XL']
    const sizes =initalSizes.map( s => {
      let size = {}
      size['id'] = this.getId()
      size[this.state.sizeheaders[0].id] = s

      for(let i=1, len=this.state.sizeheaders.length; i< len; i++){
        let sizeheader = this.state.sizeheaders[i]
        size[sizeheader.id] = '' 
      }



      return size
    } )
    this.setState({
      sizes
    })
  }

  addDetail(){
    const detail = this.getEmptyDetail()
    this.setState({
      details: [...this.state.details, detail]
    })
  }

  deleteDetail(id){
    const details = this.state.details.filter( s => s.id !== id)
    this.setState(
      {
        details
      }
    )
  }

  addTip(){
    const tip = this.getEmptyTip()
    this.setState({
      tips: [...this.state.tips, tip]
    })
  }

  deleteTip(id){
    const tips = this.state.tips.filter( s => s.id !== id)
    this.setState(
      {
        tips
      }
    )
  }

  addSizeHeader(){
    var header = this.getEmptyHeader()
    this.setState({
      sizeheaders: [...this.state.sizeheaders, header]
    })
    setTimeout(()=>{
      if(this.state.sizes.length < 1){
        this.addSizeRow()
      }else{
        const newSizes = this.state.sizes.map( size => ({
          ...size,
          [header.id]: null
        }))
        this.setState({
          sizes: newSizes
        })
      }
    },0)
    
  }

  deleteSizeHeader(id){
    const sizeheaders = this.state.sizeheaders.filter( s => s.id !== id)
    this.setState(
      {
        sizeheaders
      }
    )

    setTimeout(() => {
      const sizes = this.state.sizes
      if(sizes.length > 0){
        const newSizes = sizes.map( size => {
          let newSize = {id: size.id}
          sizeheaders.forEach((s) => {
            newSize[s.id] = size[s.id]
          })
          return newSize
        } )

        console.log(newSizes)

        this.setState({
          sizes: newSizes
        })
      }
    }, 0)
  }

  addSizeRow(){
    this.setState({
      sizes: [...this.state.sizes, this.getAEmptySize()]
    })
  }

  deleteSizeRow(id){
    const sizes = this.state.sizes.filter( s => s.id !== id)
    this.setState(
      {
        sizes
      }
    )
  }

  getEmptyTip(){
    const id = this.getId()
    return {
      id,
      value:''
    }
  }

  getEmptyDetail(){
    const id = this.getId()
    return {
      id,
      value:''
    }
  }

  getEmptyHeader(){
    const id = this.getId()
    return {
      id,
      value:''
    }
  }

  getAEmptySize(){
    const obj = {}
    obj['id'] = this.getId()
    this.state.sizeheaders.forEach(sizeheader => {
      obj[sizeheader.id] = ''
    })

    return  obj
  }

  getId(){
    return this.id++
  }

  handlerHeader(value, id){
    const headers = this.state.sizeheaders
    const header = headers.find( h => h.id === id)
    header['value'] = value
    this.setState({
      sizeheaders: [...headers]
    })
  }

  handlderSize(value, id, key){
    const sizes = this.state.sizes
    const size = sizes.find( s => s.id === id)
    size[key] = value
    this.setState({
      sizes: [...sizes]
    })
  }

  handlerDetail(value, id){
    const details = this.state.details
    const detail = details.find( d => d.id === id)
    detail['value'] = value
    this.setState({
      details: [...details]
    })
  }

  handlerTip(value, id){
    const tips = this.state.tips
    const tip = tips.find( t => t.id === id)
    tip['value'] = value
    this.setState({
      tips: [...tips]
    })
  }

  handlderDsc(value){
    this.setState({
      dsc: value
    })
  }

  onInputHandle(value, type, id, key){
    switch(type){
      case __Type_Header__:
        this.handlerHeader(value, id)
        break
      case __Type_Size__:
        this.handlderSize(value, id, key)
        break
      case __Type_Detail__:
        this.handlerDetail(value, id)
        break
      case __Type_Dsc__:
        this.handlderDsc(value)
        break
      case __Type_Tip__:
        this.handlerTip(value, id)
        break

      default:
        break

    }
  }


  getHtml(){
    return `
    <div class="GLC">
    <p><span>${this.state.dsc}</span></p>
    <p>Details:</p>
    <ul style="white-space: normal;">
    ${
      this.state.details.map( d => (`<li style="margin-bottom: 0.4em;"><span >${d.value}</span></li>`)).join('')
    }
    </ul>
    <div class="table-wrapper">
      <table class="table table table-bordered ke-zeroborder" border="0" style="font-size:12px;" allsxlist="${this.state.sizes ? this.state.sizes.map(h => h[this.state.sizeheaders[0].id]).join(' '): ''}">
        <tbody>
        <tr style="border-top: 1px solid #DDDDDD;">

        ${
          this.state.sizeheaders.map( h => (`
            <td width="70" scope="col" style="border: none; padding-left: 0px; padding-bottom: 24px;">${h.value}</td>
          `)).join('')
        }

        </tr>


        ${
          this.state.sizes.map( s => (`
          <tr style="border-top: 1px solid #DDDDDD;">
            ${
              this.state.sizeheaders.map( h => (`
                <td style="border: none; padding-left: 0px; padding-bottom: 24px;">${s[h.id]}</td>
              `)).join('')
            }
          </tr>
          `)).join('')
        }
        
        </tbody>
      </table>
    </div>
    <p><span style="font-family: Arial; font-size: 13px; font-weight: bold;">Tips:</span></p>

    ${
      this.state.tips.map( tip => (`
      <p style="margin-bottom: 15px"><span style="font-family: Arial; font-weight: 400; font-size: 13px; color: #2e3033;">${tip.value}</span></p>
      `) ).join('')
    }
    </div>
    `
  }

  render(){
    const renderedHtml = this.getHtml()
    return <div style={{maxWidth:1000, padding: 40, margin: 'auto'}}>
      <fieldset>
        <legend>Description</legend>
        <textarea style={{width:'100%'}} value={this.state.dsc} onChange={ evt => { this.onInputHandle(evt.target.value, __Type_Dsc__) } }/>
      </fieldset>

      <fieldset style={{marginTop: 40}}>
        <legend>Details</legend>
        <ul>
          {
            this.state.details.map( detail => <li key={detail.id}>
              <input onChange={evt => { this.onInputHandle(evt.target.value, __Type_Detail__, detail.id) }} value={detail.value}/>
              <button className="delete" style={{marginLeft:10}} onClick={ evt => {this.deleteDetail(detail.id)} }>Delete Detail</button>
            </li> )
          }
        </ul>
        <div>
          
          
          <button onClick={ this.addDetail.bind(this) }>Add Detail</button>

        </div>
      </fieldset>

      <fieldset style={{marginTop: 40}}>
        <legend>Size Chart</legend>
        <table style={{width:'auto'}}>
          <thead>
            <tr>
            {
              this.state.sizeheaders.map( sizeheader => <td key={sizeheader.id}>
                <input value={sizeheader.value} onChange={ evt => { this.onInputHandle(evt.target.value, __Type_Header__, sizeheader.id) } }/>
              </td>)
            }
            <td>
              {
                this.state.sizeheaders.length >= 1 && <button className="delete" onClick={evt=>{this.deleteSizeHeader( this.state.sizeheaders[this.state.sizeheaders.length-1].id)}}>删除头</button>
              }
              
              <button style={{marginLeft: 10}} onClick={this.addSizeHeader.bind(this)}>添加头</button>
            </td>
            </tr>
          </thead>
          <tbody>
            {
              this.state.sizes.map( (size, index) => <tr key={size.id}>
                {
                  this.state.sizeheaders.map( sizeheader => <td key={sizeheader.id}>
                    <input value={size[sizeheader.id]} onChange={ evt => { this.onInputHandle(evt.target.value, __Type_Size__, size.id, sizeheader.id)} } />
                  </td>)
                }
                <td>
                  {
                    this.state.sizes.length >= 1 && <button className="delete" onClick={ evt => {this.deleteSizeRow(size.id)} }>删除行</button>
                  }

                  {
                    index === this.state.sizes.length -1 && <button style={{marginLeft: 10}} onClick={this.addSizeRow.bind(this)}>添加行</button>
                  }
                  
                  
                </td>
              </tr>)
            }
          </tbody>
        </table>
      </fieldset>

      <fieldset style={{marginTop: 40}}>
        <legend>Tips</legend>
        <ul>
          {
            this.state.tips.map( tip => <li key={tip.id}>
              <textarea style={{width:'100%'}} onChange={evt => { this.onInputHandle(evt.target.value, __Type_Tip__, tip.id) }} value={tip.value}/>
              <button style={{marginRight:10}} className="delete" onClick={ evt => {this.deleteTip(tip.id)} }>Delete Tip</button>
            </li> )
          }
        </ul>
        <div>
            
        
          <button onClick={ this.addTip.bind(this) }>Add Tip</button>
          
        </div>
      </fieldset>



      <div style={{marginTop: 40}}>
        <fieldset>
          <legend>自动生成html片段</legend>
          <textarea value={renderedHtml} style={{width:'100%', height: 500}}/>
        </fieldset>
      </div>

      <div style={{marginTop: 40}}>
        <fieldset>
          <legend>预览</legend>
          <div>
            <div dangerouslySetInnerHTML={{__html: renderedHtml}}/>
          </div>
        </fieldset>
      </div>


    </div>
  }

}