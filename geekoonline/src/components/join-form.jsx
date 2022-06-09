import React from 'react'
import Styled from 'styled-components'
import {required, email, phone,number2} from './validator.jsx'
import { Form, Input, TextArea, Button, File} from './control-join.jsx'
import { personal } from '../api'

const BUTTONS = Styled.div`
  display: flex;
  justify-content: space-between;
`

const NORMALINPURCONTAINER = Styled.div`
  margin-top:12px;
  
  & > input{
    height: 36px;
    background-color: #ffffff;
    border: solid 1px #ebebeb;
    outline: none;
    box-shadow: none;
    width: 100%;
    padding-left: 10px;

    &::placeholder{
      color:#666666;
    }
  }
`;

const PRICEINPUTCONTAINER = Styled.div`
  margin-top:12px;

  ._label{
    font-size:14px;
  }

  ._content{
    display:flex;
    align-items: center;

    & > div{
      width:45%;

      &._center{
        width:10%;
        text-align:center;
      }

      & input{
        text-align:center;
      }
    }
  }
`;

const JoinForm = class extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      position: this.props.position || '招聘',
      name: '',
      phone: '',
      email: '',
      // info: '',
      price1:0,
      price2:0,
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

    switch(target.type){
      case 'checkbox':
        value = target.checked
        break
      case 'file':
        value = target.files;
        let file = target.files[0];
        console.log('file', file)
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
    data.append('position', this.state.position)
    data.append('name', this.state.name)
    data.append('phone', this.state.phone)
    data.append('email', this.state.email)
    data.append('price1', this.state.price1)
    data.append('price2', this.state.price2)
    // data.append('info', this.state.info)
    data.append('file', this.state.attachments[0])
    if(this.state.attachments2.length > 0){
      data.append('file', this.state.attachments2[0])
    }
    
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
        this.setState({
          loading: false
        })
        this.props.onSuccess();
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

      <NORMALINPURCONTAINER>
        <input value={this.state.position} readOnly />
      </NORMALINPURCONTAINER>

      {/* <div style={{marginTop: 12}}>
        <TextArea placeholder="个人信息" name="info" onChange={this.handleInputChange}/>
      </div> */}

      <PRICEINPUTCONTAINER>
        <label className='_label'>期望薪资*</label>

        <div className='_content'>
          <div>
            <Input name="price1" validations={[required, number2]} onChange={this.handleInputChange}/>
          </div>
          <div className='_center'>
            <span>至</span>
          </div>
          <div>
            <Input name="price2" validations={[required, number2]} onChange={this.handleInputChange}/>
          </div>
        </div>
      </PRICEINPUTCONTAINER>

      <div style={{marginTop: 12}}>
          <File 
            name="attachments" 
            type="file" 
            text={`上传简历*`} 
            onChange={this.handleInputChange} 
            validations={[required]}
            fileName={this.state.attachments[0] && this.state.attachments[0].name}
            description={`请上传简历，支持pdf、doc、ppt、docx、pptx、wps、jpg、jpeg、png、txt 等简历格式。`}
          />
      </div>


      <div style={{marginTop: 12}}>
        <File 
          name="attachments2" 
          type="file" 
          text={`上传作品集`} 
          onChange={this.handleInputChange} 
          fileName={this.state.attachments2[0] && this.state.attachments2[0].name}
          description={`支持文档、图片、压缩包、视频、音频、设计文件等格式文件。单次上传文件的总容量请小于50MB。`}
        />
      </div>

      <div style={{marginTop: 12}}>
        <Button ref={c => this.button = c} ingoredisable="true" style={{cursor: 'pointer', backgroundColor: '#000000', color:'#fff', border: 'none', width: '100%', height: 36}}>提交</Button>
      </div>
    </Form>
  }
}


export default JoinForm