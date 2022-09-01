import React from 'react'
import { BANNERCONTACT } from '../components/banner.jsx'
import {BLOCKIMAGE} from '../components/elements.jsx'
import {RES1, CONTAINER, CONTAINERGREY} from '../components/layout.jsx'
import Styled from 'styled-components'
import {ICONS, Icon} from '../components/icontext.jsx'
// import {Map, Marker, NavigationControl, InfoWindow} from 'react-bmap'
import { Form, Input, TextArea, Button, File} from '../components/control.jsx'
import {required, email, phone} from '../components/validator.jsx'


const FIGURE = Styled.figure`
  position: relative;
  margin-top: 55px;
  cursor: pointer;
  figcaption{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    color: #fff;
    .__title{
      font-size: 32px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
    }
  }
  &.gray{
    filter: grayscale(100%);
    filter: gray;
  }
`


const MAP = Styled.div`
  margin-top: 45px;
  height: 394px;
`

const INFO = Styled.dd`
    .__label{
      font-size: 18px;
      color: #222222;
      font-weight: bold;
    }
    .__label1{
      font-size: 14px;
	    color: #999999;
    }
    .__value{
      font-size: 18px;
      color: #666666;
      margin-left: 5px;
    }

    margin-top: 35px;

    @media (max-width: 1200px) {
      display: block;
      width: 100%;
      text-align: center;
      margin-top: 20px;
    }
`

const INFOS = Styled.dl`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-bottom: 30px;
`

const Info = {
  s: {
    name: '许女士',
    phone:'19512360018',
    email:'xuchenchen@geeko.online'
  },
  n: {
    name: '余小姐',
    phone:'17327722266',
    email:'yuping@geeko.online'
  },
  g: {
    name: '温小姐',
    phone:'15627396462',
    email:'wenxiaojie@geeko.online'
  }
}

export default class extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      selectedcity: 's',
      showMap: false
    }
  }

  maprender(c){

    let _p = {
      lng: 121.62993802581306,
      lat: 31.24801387597708,
      title: "华虹创新园",
      dsc: '上海市浦东新区锦绣东路2777弄36号10楼'
    }

    if(this.state.selectedcity === 's'){
      _p = {
        lng: 121.62993802581306,
        lat: 31.24801387597708,
        title: "华虹创新园",
        dsc: '上海市浦东新区锦绣东路2777弄36号10楼'
      }
    }else if(this.state.selectedcity === 'g'){
      _p = {
        lng: 113.260776,
        lat: 23.223391,
        title: "夏茅十三社工业区",
        dsc: '广州市白云区F栋七楼'
      }
    }else if(this.state.selectedcity === 'n'){
      _p = {
        lng: 118.76955,
        lat: 31.987873,
        title: "金地威新",
        dsc: '南京市雨花台区安德门大街23号雨花创新中心A栋1001'
      }
    }


    const map = new window.BMap.Map("mapcontact"); 
    const point = new window.BMap.Point(_p.lng, _p.lat); 
    const marker = new  window.BMap.Marker(point);        // 创建标注    

    map.addOverlay(marker);                     // 将标注添加到地图中 
    map.centerAndZoom(point, 12);  
    const opts = {    
      width : 250,     // 信息窗口宽度    
      height: 60,     // 信息窗口高度    
      title : _p.title  // 信息窗口标题   
    }    
    var infoWindow = new window.BMap.InfoWindow(_p.dsc, opts);  // 创建信息窗口对象    
    map.openInfoWindow(infoWindow, map.getCenter());
  }

  render(){


    let info = Info[this.state.selectedcity]


    return <div>
    <section>
      <BANNERCONTACT src="/images/contact/contact_p.jpg">
        <img className="contactImage" src="/images/contact/contact_m.jpg" alt="" />
      </BANNERCONTACT>
    </section>
  
    <CONTAINER>
      <section>
        <RES1 width1={373} width2={373} width3={373}>
          <FIGURE className={this.state.selectedcity !== 's' ? 'gray' : ''} onMouseOver={() => {this.setState({selectedcity:'s'})}}>
            <BLOCKIMAGE src="/images/contact/8.jpg"/>
            <figcaption>
              <div>上海公司</div>
              <div>上海市浦东新区</div>
            </figcaption>
          </FIGURE>
          <FIGURE className={this.state.selectedcity !== 'g' ? 'gray' : ''} onMouseOver={() => {this.setState({selectedcity:'g'})}}>
            <BLOCKIMAGE  src="/images/contact/4.jpg"/>
            <figcaption>
              <div>广州公司</div>
              <div>广州市白云区</div>
            </figcaption>
          </FIGURE>
          <FIGURE className={this.state.selectedcity !== 'n' ? 'gray' : ''} onMouseOver={() => {this.setState({selectedcity:'n'})}}>
            <BLOCKIMAGE  src="/images/contact/6.jpg"/>
            <figcaption>
              <div>南京公司</div>
              <div>南京市雨花区</div>
            </figcaption>
          </FIGURE>
        </RES1>
  
        
  
        
  
  
      </section>
  
     
    </CONTAINER>
  
    <MAP  ref={ this.maprender.bind(this) } id="mapcontact">
      <div></div>
      {/* <Map center={{lng: 121.618243, lat: 31.259722}} zoom="12" >
          <Marker position={{lng: 121.618243, lat: 31.259722}} />
          <InfoWindow position={{lng: 121.618243, lat: 31.259722}} text="上海市浦东新区新金桥路1122号901" title="上海极高信息技术有限公司"/>
      </Map> */}

    </MAP>


    <CONTAINER>
      {
        info && <INFOS>
        <INFO>
          <span className="__label">联系人</span>
          <span className="__label1">(CONTACT NAME)</span>
          <span className="__value">{info.name}</span>
        </INFO>

        <INFO>
          <span className="__label">电话</span>
          <span className="__label1">(TEL)</span>
          <span className="__value">{info.phone}</span>
        </INFO>

        <INFO>
          <span className="__label">邮箱</span>
          <span className="__label1">(EMAIL)</span>
          <span className="__value">{info.email}</span>
        </INFO>

        <INFO>
          <span className="__label">官网</span>
          <span className="__label1">(WEB)</span>
          <span className="__value">www.geeko.online</span>
        </INFO>
      </INFOS>
      }
      
    </CONTAINER>
  </div>
  }
}
