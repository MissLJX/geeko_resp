import React from 'react'
import Styled from 'styled-components'
import {required, email, phone} from './validator.jsx'
import { Form, Input, TextArea, Button, File} from './control-join.jsx'
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
      attachments2: [],
      loading: false
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }


  handleInputChange (event) {
    const target = event.target
    let value;
    const name = target.name;
    const fileSize = 52428800;  //50M
    console.log('target', target.name)

    switch(target.type){
      case 'checkbox':
        value = target.checked
        break
      case 'file':
        value = target.files;
        let file = target.files[0];
        if(file && (file.size > fileSize)){
          alert("上传文件请小于50M");
          return false;
        }
        break
      default:
        value = target.value
        break
    }
    
    this.setState({
      [name]: value
    })
  }

  prepare(){
    let data = new FormData()
    let dataArr = [];
    data.append('position', this.state.position)
    data.append('name', this.state.name)
    data.append('phone', this.state.phone)
    data.append('email', this.state.email)
    data.append('info', this.state.info)
    if(this.state.attachments.length > 0){
      // dataArr.push(this.state.attachments[0]);
      data.append('file', this.state.attachments[0])
    }
    if(this.state.attachments2.length > 0){
      // dataArr.push(this.state.attachments2[0]);
      data.append('file', this.state.attachments2[0])
    }
    
    // data.append('file2', this.state.attachments2[0])
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
        <Input placeholder="姓名*" name="name" validations={[required]} onChange={this.handleInputChange}/>
      </div>

      <div style={{marginTop: 12}}>
        <Input placeholder="联系电话*" name="phone" validations={[required, phone]} onChange={this.handleInputChange}/>
      </div>

      <div style={{marginTop: 12}}>
        <Input placeholder="联系邮箱*" name="email" validations={[required, email]} onChange={this.handleInputChange}/>
      </div>

      <div style={{marginTop: 12}}>
        <TextArea placeholder="个人信息" name="info" onChange={this.handleInputChange}/>
      </div>

      <div style={{marginTop: 12}}>
          <File 
            name="attachments" 
            type="file" 
            text={`上传简历*`} 
            onChange={this.handleInputChange} 
            validations={[required]}
            description={`支持pdf、doc、ppt、docx、pptx、wps、jpg、jpeg、png、txt 等简历格式。`}
          />
      </div>


      <div style={{marginTop: 12}}>
        <File 
          name="attachments2" 
          type="file" 
          text={`上传作品集`} 
          onChange={this.handleInputChange} 
          description={`支持文档、图片、压缩包、视频、音频、设计文件等格式文件。单次上传文件的总容量请小于50MB。`}
        />
      </div>

      <div style={{marginTop: 12}}>
        <Button ref={c => this.button = c} ingoredisable="true" style={{cursor: 'pointer', backgroundColor: '#000000', color:'#fff', border: 'none', width: '100%', height: 36}}>提交</Button>
      </div>

      {/* <LABEVALUES>
        <LABELVALUE>
          <span className="__label">上海地址：</span>
          <span className="__value">上海市浦东新区锦绣东路2777弄36号10楼</span>
        </LABELVALUE>
        <LABELVALUE>
          <span className="__label">电话：</span>
          <span className="__value">021 61762186</span>
        </LABELVALUE>
        <LABELVALUE>
          <span className="__label">E-mail：</span>
          <span className="__value">hr@geeko.online</span>
        </LABELVALUE>
      </LABEVALUES> */}
      
    </Form>
  }
}


export default JoinForm