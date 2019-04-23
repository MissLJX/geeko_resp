import React from 'react'
import {BANNER} from '../components/banner.jsx'
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
      lng: 121.618243,
      lat: 31.259722,
      title: "方正大厦",
      dsc: '上海市浦东新区新金桥路1122号901'
    }

    if(this.state.selectedcity === 's'){
      _p = {
        lng: 121.618243,
        lat: 31.259722,
        title: "方正大厦",
        dsc: '上海市浦东新区新金桥路1122号901'
      }
    }else if(this.state.selectedcity === 'g'){
      _p = {
        lng: 113.24404,
        lat: 23.191372,
        title: "穗新创意园B栋",
        dsc: '广州市 白云区 石井街道石槎路原潭村三社水松排工业区穗新创意园B栋302'
      }
    }else if(this.state.selectedcity === 'n'){
      _p = {
        lng: 118.791886,
        lat: 32.058007,
        title: "同仁西街7号",
        dsc: '南京市玄武区同仁西街7号6楼'
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
    return <div>
    <section>
      <BANNER src="/images/contact/2.jpg" src1="/images/contact/2_1.jpg"/>
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
              <div>南京市玄武区</div>
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
      <INFOS>
        <INFO>
          <span className="__label">联系人</span>
          <span className="__label1">(CONTACT NAME)</span>
          <span className="__value">夏先生</span>
        </INFO>

        <INFO>
          <span className="__label">电话</span>
          <span className="__label1">(TEL)</span>
          <span className="__value">021 61762186</span>
        </INFO>

        <INFO>
          <span className="__label">邮箱</span>
          <span className="__label1">(EMAIL)</span>
          <span className="__value">xialuping@geeko.online</span>
        </INFO>

        <INFO>
          <span className="__label">官网</span>
          <span className="__label1">(WEB)</span>
          <span className="__value">www.geeko.online</span>
        </INFO>
      </INFOS>
    </CONTAINER>
  </div>
  }
}
