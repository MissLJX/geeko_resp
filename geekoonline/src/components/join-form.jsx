import React from 'react'
import Styled from 'styled-components'
import {required, email, phone} from './validator.jsx'
import { Form, Input, TextArea, Button, File} from './control.jsx'
import { personal } from '../api'

const BUTTONS = Styled.div`
  display: flex;
  justify-content: space-between;
`

const LABELVALUE = Styled.div`
  .__label{
    font-size: 12px;
	  font-weight: bold;
	  color: #000000;
  }
  .__value{
    font-size: 12px;
	  color: #000000;
  }
`

const LABEVALUES = Styled.div`
  & > div{
    margin-top: 13px;
    &:first-child{
      margin-top:0;
    }
  }
  margin-top: 25px;
`

const JoinForm = class extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      position: this.props.position || '招聘',
      name: '',
      phone: '',
      email: '',
      info: '',
      attachments: [],
      loading: false
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }


  handleInputChange (event) {
    const target = event.target
    let value

    switch(target.type){
      case 'checkbox':
      value = target.checked
      break
      case 'file':
      value = target.files
      break
      default:
      value = target.value
      break
    }

    const name = target.name
    this.setState({
      [name]: value
    })
  }

  prepare(){
    let data = new FormData()
    data.append('position', this.state.position)
    data.append('name', this.state.name)
    data.append('phone', this.state.phone)
    data.append('email', this.state.email)
    data.append('info', this.state.info)
    data.append('file', this.state.attachments[0])
    return data
  }

  onSubmit(event){
    event.preventDefault()
    this.form.validateAll()
    if(!this.button.context._errors || this.button.context._errors.length < 1){
      this.setState({
        loading: true
      })
      personal(this.prepare()).then( (data) => {
        alert(data.data)
        this.setState({
          loading: false
        })
      }).catch(() => {
        this.setState({
          loading: false
        })
      })
    }
    
  }



  render(){
    return <Form onSubmit={ this.onSubmit.bind(this) } ref={ c => this.form = c }>
      <div>
        <Input placeholder="姓名" name="name" validations={[required]} onChange={this.handleInputChange}/>
      </div>

      <div style={{marginTop: 17}}>
        <Input placeholder="电话" name="phone" validations={[required, phone]} onChange={this.handleInputChange}/>
      </div>

      <div style={{marginTop: 17}}>
        <Input placeholder="邮箱" name="email" validations={[required, email]} onChange={this.handleInputChange}/>
      </div>

      <div style={{marginTop: 17}}>
        <TextArea placeholder="个人信息" name="info" validations={[required]} onChange={this.handleInputChange}/>
      </div>

      <div style={{marginTop: 37}}>
        <BUTTONS>
          <File name="attachments" type="file" text={`+ 上传建立 & 作品`} onChange={this.handleInputChange} validations={[required]}/>
          {
            this.state.loading ? <div style={{backgroundColor: '#666', color:'#fff', textAlign: 'center', lineHeight:'40px' ,border: 'none', width: 108, height: 40}}>
              提交 >
            </div> : <Button ref={c => this.button = c} ingoredisable="true" style={{cursor: 'pointer', backgroundColor: '#000000', color:'#fff', border: 'none', width: 108, height: 40}}>提交 ></Button>
          }
          
        </BUTTONS>
        
      </div>

      <LABEVALUES>
        <LABELVALUE>
          <span className="__label">上海地址：</span>
          <span className="__value">上海市浦东新区新金桥路1122号方正大厦9楼</span>
        </LABELVALUE>
        <LABELVALUE>
          <span className="__label">电话：</span>
          <span className="__value">37493293928</span>
        </LABELVALUE>
        <LABELVALUE>
          <span className="__label">E-mail：</span>
          <span className="__value">xialuping@geeko.online</span>
        </LABELVALUE>
      </LABEVALUES>
      
    </Form>
  }
}


export default JoinForm