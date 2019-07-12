import React from 'react'
import {BANNER} from '../components/banner.jsx'
import {BLOCKIMAGE} from '../components/elements.jsx'
import {RES1, CONTAINER, CONTAINERGREY} from '../components/layout.jsx'
import Styled from 'styled-components'
import {ICONS, Icon} from '../components/icontext.jsx'
import { Form, Input, TextArea, Button, Select} from '../components/control.jsx'
import {required, email, phone} from '../components/validator.jsx'


const SUPPLIERREGISTER = Styled.div`
  text-align: center;
  font-size: 3.6rem;
  color: #666666;
  margin-top: 82px;
`

const SUPPLIERSECTION = Styled.section`
  margin-top: 30px;
`

const LABELINPUT = Styled.div`
  display: table-row;
  & > div{
    display: table-cell;
    vertical-align: middle;
    padding-top: 20px;
  }

  .__label{
    label{
      display: inline-block;
      position: relative;
      &.required::before{
        content: '*';
        display: inline-block;
        position: absolute;
        left: -10px;
        top: 2px;
      }
    }
  }

  .__btn{
    width: 320px;
  }

  .__input{
    width: 320px;
  }

  @media (max-width: 1200px) {
    .__input{
      width: 200px;
    }

    .__btn{
      width: 220px;
    }
  }
`

const LABELINPUTS = Styled.div`
  display: table;
  margin-left: auto;
  margin-right: auto;
  padding: 29px 0 60px 0;

`

const LabelInput = ( props ) => <LABELINPUT>
  <div className="__label">
    <label className={props.required ? 'required': ''}>{props.title}</label>
  </div>
  
  <div className="__input">
    {props.children}
  </div>
</LABELINPUT>





export default () => <div>
  <section>
    <BANNER src="/images/supplier/1.jpg" src1="/images/supplier/1_1.jpg"/>
  </section>

  <CONTAINER>
    <section>
      <ICONS>
        <Icon className="black" title="供应商类型" description={'A.有代理或者授权证明的批发商或者经营商，具备自主设计、研发、加工能力;\n\rB.加工生产型工厂，仅具备代工能力;'}>&#xe693;</Icon>
        <Icon className="black" title="供应商服务" description={'A.稳定的供货能力，严格的品控流程，专业的售后服务\n\rB.接受少批量多频次采购\n\rC.交货时间在订单后3天内，供应商有常备库存优先'}>&#xe692;</Icon>
        <Icon className="black" title="优先合作条件" description={'A.有自主开发能力，能每月固定推出新品\n\rB.有自己的生产工厂\n\rC.能够积极配合本司的一些产品或者服务改进工作'}>&#xe694;</Icon>
      </ICONS>
    </section>
  </CONTAINER>

  <SUPPLIERREGISTER>供应商注册</SUPPLIERREGISTER>
  <SUPPLIERSECTION>
    <CONTAINERGREY>
      <div>
        <Form>
          <LABELINPUTS>
            <LabelInput title="公司名称：" required="true">
              <Input style={{height: 30}}/>
            </LabelInput>
            <LabelInput title="实际经营地址：" required="true">
              <Input style={{height: 30}}/>
            </LabelInput>
            <LabelInput title="法人/经营者：" required="true">
              <Input style={{height: 30}}/>
            </LabelInput>
            <LabelInput title="规模类型：" required="true">
              <Select style={{height: 30}}/>
            </LabelInput>
            <LabelInput title="供应商类型：" required="true">
              <Select style={{height: 30}}/>
            </LabelInput>
            <LabelInput title="供货类型：" required="true">
              <Select style={{height: 30}}/>
            </LabelInput>
            <LabelInput title="店铺网址：" required="true">
              <Input style={{height: 30}}/>
            </LabelInput>
            <LabelInput title="联系人：" required="true">
              <Input style={{height: 30}}/>
            </LabelInput>
            <LabelInput title="电话：" required="true">
              <Input style={{height: 30}}/>
            </LabelInput>
            <LabelInput title="Email：" required="true">
              <Input style={{height: 30}}/>
            </LabelInput>
            <LabelInput title="留言：" required="true">
              <TextArea style={{height: 66}}/>
            </LabelInput>
            <LabelInput>
              <Button className="__btn" style={{backgroundColor: '#000000', color:'#fff', border: 'none', height: 36}}>加入我们</Button>
            </LabelInput>
          </LABELINPUTS>
        </Form>
      </div>
    </CONTAINERGREY>
  </SUPPLIERSECTION>

</div>