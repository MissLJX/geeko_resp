import React from 'react'
import {BANNER} from '../components/banner.jsx'
import {BLOCKIMAGE} from '../components/elements.jsx'
import { CONTAINERGREY} from '../components/layout.jsx'
import Styled from 'styled-components'
import {ICONS, Icon} from '../components/icontext-join.jsx'
// import {Map, Marker, NavigationControl, InfoWindow} from 'react-bmap'
import { Link } from 'react-router-dom'
import JoinForm from '../components/join-form.jsx';
import CompanyMessage from '../components/company-message.jsx'
import { data,data2 } from '../store/index';
import _ from 'lodash';
import JoinMore from './join-more.jsx'

const RES1 = Styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding:0px;
  margin-top:80px;

  & > *:nth-child(1){
    width: calc(${props => props.width1}px - 30px);
  }
  & > *:nth-child(2){
    width: calc(${props => props.width2}px - 30px);
  }

  & > *:nth-child(3){
    width: ${props => props.width3}px;
  }

  @media (max-width: 1200px) {
    padding:0px 20px 0px 20px;
    margin-top:0px;

    & > *:nth-child(1){
      width: 100%;
    }
    & > *:nth-child(2){
      width: 100%;
    }
    & > *:nth-child(3){
      width: 100%;
    }
  }

`

const BLOCKER = Styled.div`
  // padding-top: 89px;
  
  @media (max-width: 1200px) {
    // padding-top: 80px;
    &.__1{
      // padding-top: 30px;
      margin-top:20px;
    }
    &:first-child{
      // margin-top: 20px;
      // padding-top:60px;
    }

    &.__none{
      display:none;
    }
  }
`

const BLOCKER2 = Styled.div`
  padding-top: 89px;

  & > video{
    display:block;
  }
  
  @media (max-width: 1200px) {
    padding-top: 60px;
    &.__1{
      // padding-top: 30px;
      // margin-top:20px;
    }
    &:first-child{
      // margin-top: 20px;
      // padding-top:60px;
    }
  }
`

const ART = Styled.div`
  .__title{
    font-size: 42px;
    line-height:65px;
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
    font-size: 20px;
    line-height: 40px;
    letter-spacing: 0px;
    color: #222222;
    margin-top:5px;
  }

  &.__1{
    // padding: 0 107px;
    // padding-top: 50px;
  }

  &.__2{
    // padding: 0 64px;
    // padding-top: 157px;
  }


  @media (max-width: 1200px) {
    &.__1, &.__2{
      padding: 0;
    }

    .__title{
      font-size:22px;
      line-height:40px;
    }

    p{
      font-size: 14px;
      line-height: 22px;
    }
  }
`

const MAP = Styled.div`
  height: 488px !important;
  
  @media (max-width: 1200px) {
      height: 350px !important;
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

const JSONBIGCONTAINER = Styled.div`
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 1200px) {
    width: 100%;
  }
`

const SEARCHCONTAINER = Styled.div`
  background-color: #f0f0f0;
  padding: 20px;

  .screen-container{
    display:block;

    input{
      width: 100%;
      border: none;
      box-shadow: none;
      outline: none;
      height: 36px;
      line-height: 36px;
      padding-left: 15px;
      font-size: 12px;
      color: #666666;
    }
  
    ._container{
      margin-top: 19px;
  
      .title{
        font-size: 12px;
        color: #666666;
      }
  
      .content{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin-top:10px;
  
        & > span{
          display: inline-block;
          width: 23%;
          margin-right: 2%;
          height: 30px;
          line-height: 28px;
          background-color: #ffffff;
          text-align: center;
          font-size: 12px;
          color: #666666;
          cursor: pointer;
          border: 1px solid #fff;
  
          &.active{
            border: 1px solid #222;
            color: #222222;
            font-weight:bold;
          }
        }
      }
    }
  
    button{
      margin-top: 15px;
      display: inline-block;
      background-color: #222;
      color: #fff;
      border: none;
      box-shadow: none;
      outline: none;
      width: 100%;
      height: 36px;
      line-height: 36px;
      font-size: 12px;
      text-align: center;
    }
  
    ._container{
      display:block;
    }
  
    ._container2{
      display:none;
    }
  }

  ._header{
    background-color: #f0f0f0;
    margin-top:15px;

    ._content{
      display:flex;
      justify-content: center;
      
      & > div{
        width: 25%;
        font-size: 16px;
        color: #222222;
        text-align: center;
        font-weight: bold;
        cursor:pointer;
  
        &.active{
          & > span{
            position:relative;
    
            &::after{
              content: '';
              position: absolute;
              height: 3px;
              background-color: #222;
              display: inline-block;
              bottom: -5px;
              left: 50%;
              transform: translate(-50%);
              width: 60%;
            }
          }
        }
      }
    }
  }

  @media (min-width: 1200px) {
    padding: 30px 0px;

    .screen-container{
      display:flex;
      align-items: center;

      input{
        width:365px;
        height: 42px;
        line-height: 42px;
        margin-right:20px;
      }
  
      ._container{
        display:none;
      }
  
      ._container2{
        display:block;
        margin-right:20px;
  
        select{
          width: 160px;
          height: 42px;
          line-height: 42px;
          border: none;
          padding: 0px 10px;
          text-align: center;
          font-size:16px;
          color:#666666;
        }
      }
  
      button{
        margin-top:0;
        height: 42px;
        line-height: 42px;
        width: 160px;
        font-size:16px;
        cursor:pointer;
        margin-right:20px;
      }
    }

    ._header{
      margin-top:30px;
      padding:0;
      ._content{
        justify-content: flex-start;

        & > div{
          margin-right:20px;
          width:auto;
        }
      }
    }
  }
`;

const SEARCHRESULR = Styled.div`
  border-bottom:10px solid #f0f0f0;

  ._content{
    padding:0px 20px 20px;

    ._item{
      display:flex;
      flex-wrap:wrap;
      align-items: center;
      border-bottom:1px solid #cacaca;
      padding-top: 10px;

      & > p{
        width:50%;
        padding-bottom: 10px;
        font-weight: 400;

        &:nth-child(even){
          text-align:right;
        }
      }

      ._title{
        width:60%;
        & > a{
          font-size: 14px;
          color: #4896D4;
          text-decoration: none;
          font-weight: bold;
        }
      }

      ._invite{
        font-size:12px;
        color:#999999;
        width:40%;
      }

      ._region{
        font-size:12px;
        color:#222222;
        font-weight:bold;
      }

      ._time{
        font-size:12px;
        color:#999999;
      }
    }

    .empty-result{
      min-height: 200px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 400;
      color: #999999;
    }

    .more-post{
      display: block;
      width:100%;
      height: 36px;
      line-height: 36px;
      background-color: #222;
      color: #fff;
      text-decoration: none;
      text-align: center;
      border: none;
      font-size: 12px;
      border-radius: 2px;
      cursor: pointer;
      font-weight: 400;
      margin-top:15px;
    }
  }

  @media (min-width: 1200px) {
    border-bottom:none;

    ._content{
      padding:0;

      ._item{
        padding-top:20px;

        & > p{
          width:25%;
          padding-bottom:20px;
        }

        ._title{
          width:25%;

          & > a{
            font-size:18px;
          }
        }

        ._invite{
          width:25%;
          font-size:16px;
          color:#222222;
        }

        ._region{
          font-size:16px;
        }

        ._time{
          font-size:16px;
        }

        .__pc{
          text-align:center !important;
        }
      }
      
      .more-post{
        width:240px;
      }
    }
  }
`;

export default class extends React.Component{
  constructor(props){
    super(props);
  }

  maprender(c){
    let _p = {
      lng: 121.62993802581306,
      lat: 31.24801387597708,
      title: "华虹创新园",
      dsc: '上海市浦东新区锦绣东路2777弄36号10楼'
    }



    const map = new window.BMap.Map("mapjoin"); 
    const point = new window.BMap.Point(_p.lng, _p.lat); 
    const marker = new  window.BMap.Marker(point);        // 创建标注    
    map.centerAndZoom(point, 17);  
    map.addOverlay(marker);  // 将标注添加到地图中 
    
    const opts = {    
      width : 250,     // 信息窗口宽度    
      height: 60,     // 信息窗口高度    
      title : _p.title  // 信息窗口标题   
    }    
    var infoWindow = new window.BMap.InfoWindow(_p.dsc, opts);  // 创建信息窗口对象    
    map.openInfoWindow(infoWindow, map.getCenter());
    
  }

  
  onSumbit(data){
    console.log('data', data)
  }

  render(){
    return <div>
    {/* <section>
      <BANNER src="/images/join/6.jpg" src1="/images/join/6_1.jpg"/>
    </section> */}

    <BLOCKER2>
      <video style={{width: '100%'}} src="https://image.geeko.ltd/upgrade/20210402/geeko.mp4" preload autoplay="autoplay" controls/>
    </BLOCKER2>
  
    <JoinMore isJoin></JoinMore>
      
    <JSONBIGCONTAINER>
      <section>
          <RES1 width1={600} width2={600}>
            <BLOCKER className="__1">
              <ART className="__1">
                <div className="__title">GEEKO福利</div>
                <div style={{marginTop: 20}}>
                  <p>一、入职即购买社保（医疗、养老、工伤、失业、生育）、公积金；</p>
                  <p>二、年度旅游；部门团建；定期体检；带薪年假等；</p>
                  <p>三、节假日礼品，生日福利，看电影、下午茶等活动；</p>
                  <p>四、公司根据年度整体效益，为做出贡献的优秀员工发放年末红包进行奖励！</p>
                </div>
              </ART>
            </BLOCKER>
            <BLOCKER className="__1">
              <BLOCKIMAGE src="/images/join/4.jpg"/>
            </BLOCKER>
          </RES1>
    
          <RES1 width1={688} width2={512} style={{direction: 'rtl'}}>
            <BLOCKER className="__1" style={{ direction: 'ltr'}}>
              <ART className="__2">
                <div className="__title">致求职的你</div>
                <div style={{marginTop: 20}}>
                  <p>GEEKO是一家以人为本的公司，始终希望找到最合适的人，做最合适的事。我们致力于打造一个世界性的快时尚电商品牌平台，服务全球用户。如果你也认同我们的理念，请加入我们，跟我们一起，共同创造未来，拼搏梦想。</p>
                  <p>在这里，没有等级森严的公司架构；</p>
                  <p style={{marginTop:30}}>在这里，没有冗杂繁复的各项流程；</p>
                  <p>这里，有活力无限的同事；</p>
                  <p>这里，有平等友爱的气氛；</p>
                  <p>这里，有创意灵感的温床；</p>
                  <p>GEEKO尊重每一位小伙伴的个性成长，平等对待每一位小伙伴的意见与灵感。我们期待与您共事，这是我们的荣幸。</p>
                </div>
              </ART>
            </BLOCKER>
            <BLOCKER className="__1 __none">
              <BLOCKIMAGE src="/images/join/pc_join_1.jpg"/>
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
    </JSONBIGCONTAINER>
  
    <CONTAINERGREY>
      <JOINCONTAINER>
        <RES1 width1={624} width2={489} style={{padding:0,alignItems:'center'}}>
          <MAP className="__c"  ref={ this.maprender.bind(this) } id="mapjoin">
            {/* <Map center={{lng: 121.618243, lat: 31.259722}} zoom="17" >
                <Marker position={{lng: 121.618243, lat: 31.259722}} />
                <InfoWindow position={{lng: 121.618243, lat: 31.259722}} text="上海市浦东新区新金桥路1122号901" title="上海极高信息技术有限公司"/>
            </Map> */}
          </MAP>
          <div className="__c">
            <CompanyMessage />
          </div>
        </RES1>
      </JOINCONTAINER>
      
    </CONTAINERGREY>
  </div>
  }
}

