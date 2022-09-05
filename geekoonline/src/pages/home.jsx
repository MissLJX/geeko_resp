import React from 'react'
import {SMALLBANNER} from '../components/banner.jsx'
import {CONTENT1S} from '../components/text.jsx'
import {BLOCKIMAGE} from '../components/elements.jsx'
import {RES1, CONTAINER} from '../components/layout.jsx'
import Styled from 'styled-components'


const TITLE1 = Styled.span`
  font-size: 4.4rem;
  letter-spacing: 0px;
  color: #000000;
  font-weight:bold;
  @media (max-width: 1200px) {
    font-size: 3.5rem;
  }
`

const BANNERTITLE = Styled.div`
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  width: 1022px;
  text-align: center;

  .__title{
    line-height: 12.3rem;
    font-size: 8.5rem;
    letter-spacing: .49rem;
    color: #ffffff;
  }

  .__dsc{
    font-size: 3rem;
    line-height: 5rem;
    color: #ffffff;
    width: 780px;
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 1200px) {
    width: 100%;
    .__title{
      font-size: 2.5rem;
      line-height: 4.5rem;
    }
    .__dsc{
      width: 90%;
      font-size: 1.6rem;
      line-height: 2.8rem;
    }
  }
`

const BLOCKER = Styled.div`
  margin-top: 50px
  @media (max-width: 1200px) {
    margin-top: 20px;

    &.__none{
      display:none;
    }
  }
`

const HISTORIES = Styled.ul`
  padding-left: 10px;
  & > li{

    display: table;
    padding-bottom: 18px;
    border-left: 1px solid #222;
    position: relative;
    padding-left: 25px;

    &:last-child{
      border-left: none;
      padding-bottom: 0;
    }

    & > div{
      display: table-cell;
      vertical-align: top;
      position: relative;
      top: -5px;

      &.__width{
        width:85px;
      }
    }

    .__title{
      font-size: 16px;
      line-height: 29px;
      font-weight: bold;
    }

    .__dsc{
      font-size: 16px;
      line-height: 29px;
      color:#666666;
    }

    .__circle{
      width: 14px;
      height: 14px;
      border: 1px solid #222;
      background-color: #fff;
      border-radius: 50%;
      left: -7px;
      top: 0;
      display: block;
      position: absolute;

      & > span{
        width: 7px;
        height: 7px;
        background-color: #666666;
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        border-radius: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }

  @media (min-width: 1200px) {
    & > li{
      padding-bottom: 30px;
    }
  }
`;

const VIDEOCONTAINER = Styled.div`
  margin-top:14px;

  @media (min-width: 1200px) {
    margin-top:40px;
    width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const FLOATRES1 = Styled.div`
  & > *:nth-child(1){
    width: ${props => props.width1}px;
  }
  & > *:nth-child(2){
    width: ${props => props.width2}px;
    float:right;
  }

  & > *:nth-child(3){
    width: ${props => props.width3}px;
  }

  .__image{
    float:right;
    width:600px;
    padding-left:20px;

    &.__none_pc{
      display:none;
    }
  }

  @media (max-width: 1200px) {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    & > *:nth-child(1){
      width: 100%;
    }
    & > *:nth-child(2){
      width: 100%;
    }
    & > *:nth-child(3){
      width: 100%;
    }

    .__image{
      float:none;
      width:100%;
      padding-left:0px;
      margin-top:20px;

      &.__none_msite{
        display:none;
      }

      &.__none_pc{
        display:block;
      }
    }
  }

`

const CONTENT1 = Styled.p`
  font-size: 1.8rem;
  line-height: 3.4rem;
  letter-spacing: .1rem;
  color: #000000;
  @media (max-width: 1200px) {
    font-size: 1.6rem;
    line-height: 2.6rem;
    letter-spacing: .1rem;
  }
`



export default () => <div>
  <section>
    <SMALLBANNER src="/images/about/pc_home_1.jpg" src1="/images/about/m_home_1.jpg" style={{position:'relative'}}>
      {/* <BANNERTITLE>
        <div className="__title">有温度的快时尚跨境电商</div>
        <div className="__dsc">以快时尚女装为业务主体，主要面对欧美、南美等消费市场是专注于欧美女装快时尚的跨境B2C互联网企业</div>
      </BANNERTITLE> */}
    </SMALLBANNER>

  </section>

  <VIDEOCONTAINER>
    <section>
      <video style={{width: '100%'}} src="/videos/chic2.mp4" preload autoplay="autoplay" controls/>
    </section>
  </VIDEOCONTAINER>
  
  <CONTAINER>
    <section style={{padding: '0px 0px 20px 0px'}}>
      <FLOATRES1 width1={1200} width2={600}>
        <BLOCKER >
          <div>
            <TITLE1>公司简介</TITLE1>
          </div>
          
          <CONTENT1S style={{marginTop: 14}}>
            <div className='__image __none_msite'>
              <BLOCKIMAGE src="/images/about/pc_home_2.jpg"/>
            </div>
            <CONTENT1>
            上海极高是一家成立于2015年的跨境B2C互联网企业，专注于经营跨境电商快时尚领域，为全球消费者提供高性价比的时尚产品。公司总部设在上海，并在广州、南京、香港、合肥、新加坡、欧洲、美国、英国等多个地方开设分支机构，目前已经进入了北美、南美、欧洲等市场。
            </CONTENT1>
            <CONTENT1>
            2015年起，公司自有品牌CHICME上线，依托国内外的产品和供应链优势，不断整合行业资源，建立从设计开发到纸样打版，从面料采购到成衣制造，从电商运营到售后服务的完备的运营体系。实现从研发、生产、销售、售后等快速响应的一条龙服务。
            </CONTENT1>
            <CONTENT1>
            我们有超过50人的行业经验丰富的设计师队伍，日出新款100+。拥有2万平以上的仓储空间、完善的物流以及配送体系，行业高标准的执行流程。
            </CONTENT1>
            <CONTENT1>
            依靠良好的质量与口碑、快速更新的款式、强大的供应链体系、十多年的跨境电商行业运营经验，CHICME会员数量不断增长，到目前为止海外会员数已超过1000万，Instagram粉丝数250万。
            </CONTENT1>

            <CONTENT1>
            目前，我们已打造出以CHICME为首的品牌矩阵，同步开发了PC端、IOS移动端、Andriod移动端购物商城。7年来公司业务在快速的扩张，但是我们依旧不改初心，始终把用户体验当做重心，积极倾听理解客户需求，面对市场变化快速反应；自主研发各业务后台的IT支持系统，不断优化业务流程，使得各个业务环节无缝链接。拥有自实现云平台，具备高扩展、高可用、高性能的应用服务，并引入大数据引擎分析用户行为及可自我学习的核心算法。为了能快速解决客户的各种问题，客服团队迅速扩展到80多人。我们始终致力于带给用户极致的购物体验。
            </CONTENT1>

            <CONTENT1>
            我们秉承客户至上的工作理念，不断优化公司运营机制，不断提升品牌经营水平。
            </CONTENT1>

            <CONTENT1>
            如果你热爱时尚行业；
            </CONTENT1>

            <CONTENT1>
            如果你有志于投身互联网品牌出海浪潮；
            </CONTENT1>

            <CONTENT1>
            如果你不想错过一个超越ASOS,指向Zara的创业机会；
            </CONTENT1>

            <CONTENT1>
            欢迎你加入我们，亲手创造全球时尚电商行业下一个奇迹，不再遗憾！
            </CONTENT1>

            <div style={{clear:'both'}}></div>

            <div className='__image __none_pc'>
              <BLOCKIMAGE src="/images/about/pc_home_2.jpg"/>
            </div>
          </CONTENT1S>
        </BLOCKER>
      </FLOATRES1>

      <RES1 width1={686} width2={455} style={{direction: 'rtl'}}>
        
        <BLOCKER style={{direction: 'ltr'}}>
          <div>
            <TITLE1>发展历程</TITLE1>
          </div>
          
          <HISTORIES style={{marginTop: 23}}>
            <li>
              <span className='__circle'><span></span></span>
              <div className='__width'><span className="__title">2015/5</span></div>
              <div><p className="__dsc">上海极高公司成立</p></div>
            </li>
            <li>
              <span className='__circle'><span></span></span>
              <div className='__width'><span className="__title">2015/8</span></div>
              <div><p className="__dsc">chicme品牌上线运营</p></div>
            </li>
            <li>
              <span className='__circle'><span></span></span>
              <div className='__width'><span className="__title">2015/10</span></div>
              <div><p className="__dsc">注册用户超过100万</p></div>
            </li>
            <li>
              <span className='__circle'><span></span></span>
              <div className='__width'><span className="__title">2016</span></div>
              <div><p className="__dsc">南京、广州分公司成立</p></div>
            </li>
            <li>
              <span className='__circle'><span></span></span>
              <div className='__width'><span className="__title">2017</span></div>
              <div><p className="__dsc">美国公司成立.销售额激增</p></div>
            </li>
            <li>
              <span className='__circle'><span></span></span>
              <div className='__width'><span className="__title">2018</span></div>
              <div><p className="__dsc">旗下品牌超过10个</p></div>
            </li>
            <li>
              <span className='__circle'><span></span></span>
              <div className='__width'><span className="__title">2019</span></div>
              <div><p className="__dsc">业务覆盖全球，增长率稳定</p></div>
            </li>
            <li>
              <span className='__circle'><span></span></span>
              <div className='__width'><span className="__title">2020</span></div>
              <div><p className="__dsc">谷歌和BrandZ评选中国最具潜力全球化品牌15强&Paypal最佳移动体验奖</p></div>
            </li>
          </HISTORIES>
        </BLOCKER>

        <BLOCKER className='__none'>
          <BLOCKIMAGE src="/images/about/pc_home_3.jpg"/>
        </BLOCKER>
      </RES1>

    </section>
  </CONTAINER>
  
</div>