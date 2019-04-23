import React from 'react'
import {BANNER} from '../components/banner.jsx'
import {BLOCKIMAGE} from '../components/elements.jsx'
import {RES1, CONTAINER, CONTAINERGREY} from '../components/layout.jsx'
import Styled from 'styled-components'
import {ICONS, Icon} from '../components/icontext.jsx'
import {Map, Marker, NavigationControl, InfoWindow} from 'react-bmap'
import { Form, Input, TextArea, Button, File} from '../components/control.jsx'
import {required, email, phone} from '../components/validator.jsx'
import { Link } from 'react-router-dom'


const FIGURE = Styled.figure`
  position: relative;
  figcaption{
    position: absolute;
    bottom: -53px;
    height: 106px;
    background-color: #222222;
    box-shadow: 0px 2px 12px 0px rgba(153,153,153,0.5);
    font-size: 3.2rem;
    color: #fff;
    line-height: 106px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    text-align: center;
  }
`

const BLOCKER = Styled.div`
  margin-top: 60px;
  
  @media (max-width: 1200px) {
    margin-top: 80px;
    &.__1{
      margin-top: 30px;
    }
    &:first-child{
      margin-top: 20px;
    }
  }
`

const ART = Styled.div`

  .__title{
    font-size: 3.6rem;
    line-height: 5rem;
    color: #222222;
    font-weight: bold;
    position: relative;
    &::after{
      position: absolute;
      border-bottom: 4px solid #222;
      width: 95px;
      left: 0;
      bottom: -2px;
      content: '';
    }
  }
  p{
    font-size: 1.6rem;
    line-height: 2.5rem;
    letter-spacing: 0px;
    color: #999999;
  }

  &.__1{
    padding: 0 107px;
    padding-top: 50px;
  }

  &.__2{
    padding: 0 64px;
    padding-top: 157px;
  }


  @media (max-width: 1200px) {
    &.__1, &.__2{
      padding: 0 10px;
      
    }
  }
`

const MAP = Styled.div`
  & > div{
    height: 488px !important;
  }
  
  @media (max-width: 1200px) {
    & > div{
      height: 350px !important;
    }
  }
`

const JOINCONTAINER = Styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 90px;
  width: 1158px;
  padding-top: 82px;
  padding-bottom: 90px;
  @media (max-width: 1200px) {
      width: auto;
      padding-top: 20px;
      padding-bottom: 20px;
      padding-left: 20px;
      padding-right: 20px;
      .__c{
        margin-top: 20px;
      }
  }
`

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



export default () => <div>
  <section>
    <BANNER src="/images/join/6.jpg" src1="/images/join/6_1.jpg"/>
  </section>

  <CONTAINER>
    <section>
      <RES1 width1={373} width2={373} width3={373}>
        <BLOCKER>
          <Link to="/join/shanghai">
            <FIGURE>
              <BLOCKIMAGE src="/images/join/1.jpg" src1="/images/join/1.jpg"/>
              <figcaption>
                上海招聘
              </figcaption>
            </FIGURE>
          </Link>
        </BLOCKER>
        <BLOCKER>
          <Link to="/join/guangzhou">
            <FIGURE>
              <BLOCKIMAGE src="/images/join/2.jpg"/>
              <figcaption>
                广州招聘
              </figcaption>
            </FIGURE>
          </Link>
        </BLOCKER>
        <BLOCKER>
          <Link to="/join/nanjing">
            <FIGURE>
              <BLOCKIMAGE src="/images/join/3.jpg"/>
              <figcaption>
                南京招聘
              </figcaption>
            </FIGURE>
          </Link>
        </BLOCKER>
      </RES1>

      <RES1 width1={537} width2={663} style={{marginTop: 60}}>
        <BLOCKER className="__1">
          <ART className="__1">
            <div className="__title">GEEKO福利</div>
            <div style={{marginTop: 20}}>
              <p>入职即购买社保（医疗、养老、工伤、失业、生育）、公积金；</p>
              <p>年度旅游；部门团建；定期体检；餐费补贴；交通补贴、带薪年假等；</p>
              <p>节假日礼品，生日福利，看电影、下午茶等活动；</p>
              <p>公司根据年度整体效益，为做出贡献的优秀员工发放年末红包进行奖励！</p>
            </div>
          </ART>
        </BLOCKER>
        <BLOCKER className="__1">
          <BLOCKIMAGE src="/images/join/4.jpg"/>
        </BLOCKER>
      </RES1>

      <RES1 width1={688} width2={512} style={{marginTop: 60, direction: 'rtl'}}>
        <BLOCKER className="__1" style={{ direction: 'ltr'}}>
          <ART className="__2">
            <div className="__title">致求职的你</div>
            <div style={{marginTop: 20}}>
              <p>GEEKO是一家以人为本的公司，始终希望找到最合适的人，做最合适的事。我们致力于打造一个世界性的快时尚电商品牌平台，服务全球用户。如果你也认同我们的理念，请加入我们，跟我们一起，共同创造未来，拼搏梦想。</p>
              <p>在这里，没有等级森严的公司架构；</p>
              <p>在这里，没有冗杂繁复的各项流程；</p>
              <p>这里，有活力无限的同事；</p>
              <p>这里，有平等友爱的气氛；</p>
              <p>这里，有创意灵感的温床；</p>
              <p>GEEKO尊重每一位小伙伴的个性成长，平等对待每一位小伙伴的意见与灵感。我们期待与您共事，这是我们的荣幸。</p>
            </div>
          </ART>
        </BLOCKER>
        <BLOCKER className="__1">
          <BLOCKIMAGE src="/images/join/5.jpg"/>
        </BLOCKER>
      </RES1>

      


    </section>

    <section>
      <ICONS>
        <Icon title="上班时间 " description="9:00-18:00 五天制（周末双休）">&#xe688;</Icon>
        <Icon title="公司愿景" description={'助力中国制造走向世界\n\r打造有温度的快时尚品牌，服务于全球消费者'}>&#xe687;</Icon>
        <Icon title="员工福利" description={'五险一金、带薪病假、水果零食下午茶\n\r团建活动、定期体检、海外旅游、节假日礼品'}>&#xe686;</Icon>
      </ICONS>
    </section>
  </CONTAINER>

  <CONTAINERGREY>
    <JOINCONTAINER>
      <RES1 width1={624} width2={489}>
        <MAP className="__c">
          <Map center={{lng: 121.618243, lat: 31.259722}} zoom="17" >
              <Marker position={{lng: 121.618243, lat: 31.259722}} />
              {/* <NavigationControl />  */}
              <InfoWindow position={{lng: 121.618243, lat: 31.259722}} text="上海市浦东新区新金桥路1122号901" title="上海极高信息技术有限公司"/>
          </Map>
        </MAP>
        <div className="__c">
          <Form>
            <div>
              <Input placeholder="姓名" name="name" validations={[required]}/>
            </div>

            <div style={{marginTop: 17}}>
              <Input placeholder="电话" name="phone" validations={[required, phone]}/>
            </div>

            <div style={{marginTop: 17}}>
              <Input placeholder="邮箱" name="email" validations={[required, email]}/>
            </div>

            <div style={{marginTop: 17}}>
              <TextArea placeholder="个人信息" name="info" validations={[required, email]}/>
            </div>

            <div style={{marginTop: 37}}>
              <BUTTONS>
                <File type="file" text={`+ 上传建立 & 作品`}/>
                <Button style={{backgroundColor: '#000000', color:'#fff', border: 'none', width: 108, height: 40}}>提交 ></Button>
              </BUTTONS>
              
            </div>
            
          </Form>

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
              <span className="__value">22043806@qq.com</span>
            </LABELVALUE>
          </LABEVALUES>
        </div>
      </RES1>
    </JOINCONTAINER>
    
  </CONTAINERGREY>
</div>