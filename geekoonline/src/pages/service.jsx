import React from 'react'
import {BANNER} from '../components/banner.jsx'
import {BLOCKIMAGE} from '../components/elements.jsx'
import {RES1, CONTAINER, CONTAINERGREY} from '../components/layout.jsx'
import Styled from 'styled-components'


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
    font-size: 2rem;
    line-height: 3.6rem;
    letter-spacing: 0px;
    color: #999999;
  }

  &.__1{
    padding: 0 106px;
    padding-top: 50px;
  }

  &.__2{
    padding: 38px 90px;
  }

  &.__3{
    padding: 0 101px 0 109px;
  }

  &.__4{
    padding:  130px 229px 0 90px;
  }


  @media (max-width: 1200px) {
    &.__1, &.__2,&.__3,&.__4{
      padding: 0 10px;
    }
  }
`

const ICONTEXT = Styled.div`
  .__icon{
    color: #000000;
    font-family: iconfont;
    font-size: 36px;
  }
  .__title{
    line-height: 5rem;
    font-size: 3.6rem;
    font-weight: bold;
    color: #222222;
    margin-top: 20px;
  }
  .__dsc{
    font-size: 2rem;
    color: #999999;
    margin-op: 13px;
  }
  padding: 70px 0;
  @media (max-width: 1200px) {
    padding: 25px 0;
  }
`

const GREYSECTION = Styled.div`
  margin-top: 90px;
`

const TEXTCONTAINER = Styled.div`
  max-width: 834px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  padding: 96px 0;
  .__title{
    font-size: 3.6rem;
    line-height: 5rem;
    color: #222222;
    font-weight: bold;
  }
  .__dsc{
    font-size: 2rem;
    line-height: 3.6rem;
    color: #999;
    margin-top: 30px;
  }

  @media (max-width: 1200px) {
    padding: 30px 20px;
    .__title{
      font-size: 3.6rem;
      line-height: 5rem;
      color: #222222;
      font-weight: bold;
    }
    .__dsc{
      font-size: 2rem;
      line-height: 3rem;
      color: #999;
      margin-top: 10px;
    }
  }
`


export default () => <div>
  <section>
    <BANNER src="/images/geeko/6.jpg" src1="/images/geeko/6_1.jpg"/>
     
  </section>

  <CONTAINER>
    <section>
      

      <RES1 width1={760} width2={440} style={{marginTop: 60}}>
        <BLOCKER>
          <ART className="__1">
            
            <div className="__title">经营理念</div>
            <div style={{marginTop: 20}}>
              <p>公司自创办以来，全力推进全球资源供应整合，力求将物美价廉的快时尚产品和一流的服务带给全球的每一位用户，并积极与消费者互动，打造有温度的品牌。</p>
              <p>紧跟时尚潮流，每日上新数百款商品，所想即能所见所得。以最优质、最快速的供应链体系为支撑，确保用户下单后，在最短的时间内即可收到所购商品。以24H在线服务为依托，提供便捷无忧的售后服务。</p>
            </div>
          </ART>
        </BLOCKER>
        <BLOCKER>
          <BLOCKIMAGE src="/images/geeko/2.jpg"/>
        </BLOCKER>
      </RES1>

      <RES1 width1={827} width2={373} style={{marginTop: 60, direction: 'rtl'}}>
        <BLOCKER className="__1" style={{ direction: 'ltr'}}>
          <ART className="__2">
            <div className="__title">行业合作</div>
            <div style={{marginTop: 20}}>
              <p>与Facebook、Instagram、google、Twitter等多个全球知名社交及搜索引擎公司达成深度合作协议，给产品赋予温度，带有社交属性，让全球更多的人能够体验与感受到时尚之美，传播美。</p>
            </div>
          </ART>
        </BLOCKER>
        <BLOCKER className="__1">
          <BLOCKIMAGE src="/images/geeko/3.jpg"/>
        </BLOCKER>
      </RES1>

      


    </section>

  </CONTAINER>

  <GREYSECTION>
    <CONTAINERGREY>
      <CONTAINER>
        <RES1 width1={365} width2={342} width3={405}>
          <ICONTEXT>
            <div className="__icon">&#xe689;</div>
            <div className="__title">公司理念</div>
            <div className="__dsc">打造有温度的快时尚品牌，服务于全球消费者，提供卓越的产品和一流的服务</div>
          </ICONTEXT>
          <ICONTEXT>
            <div className="__icon">&#xe68a;</div>
            <div className="__title">业务范围</div>
            <div className="__dsc">女装、配饰、女鞋、美妆、特殊服装、家居及童装</div>
          </ICONTEXT>
          <ICONTEXT>
            <div className="__icon">&#xe68b;</div>
            <div className="__title">销售区域</div>
            <div className="__dsc">欧美及南美主要国家（美国、巴西、西班牙、德国、法国、英国、印度、加拿大、印度等）</div>
          </ICONTEXT>
        </RES1>
      </CONTAINER>

    </CONTAINERGREY>
  </GREYSECTION>

  <CONTAINER>
    <section>
      <RES1 width1={777} width2={423} style={{marginTop: 60}}>
        <BLOCKER>
          <ART className="__3">
            <div className="__title">设计团队</div>
            <div style={{marginTop: 20}}>
              <p>自geeko创办之初就十分重视产品设计，建立了强大的设计团队，设计师来自国内外同行业知名设计团队，目前设计团队总人数已超过50人。设计师及其团队主要来自中国、美国、欧洲等。</p>
              <p>另外，在多个核心市场都配备买手及信息收集团队，收集当地的流行趋势、文化特色，给设计师提供充足的资讯作为参考。确保产品能够紧跟时尚潮流，让每一位顾客感受到美的享受。</p>
            </div>
          </ART>
        </BLOCKER>
        <BLOCKER>
          <BLOCKIMAGE src="/images/geeko/4.jpg"/>
        </BLOCKER>
      </RES1>

      <RES1 width1={755} width2={445} style={{marginTop: 60, direction: 'rtl'}}>
        <BLOCKER style={{ direction: 'ltr'}}>
          <ART className="__4">
            <div className="__title">行业合作</div>
            <div style={{marginTop: 20}}>
              <p>一站式便捷购物体验。顾客可随时随地通过手机app端或电脑端进行浏览及下单。紧跟潮流事件,多时段多样化购物活动相结合，为用户带来最大的优惠。极力让用户以最少的花费和精力，购买到当下最时尚、最超值、最优质的心仪商品。与此同时，geeko已在多个国家开通24h在线客户服务，提供便捷无忧的售后服务。</p>
            </div>
          </ART>
        </BLOCKER>
        <BLOCKER>
          <BLOCKIMAGE src="/images/geeko/5.jpg"/>
        </BLOCKER>
      </RES1>

      


    </section>

  </CONTAINER>

  <GREYSECTION>
    <CONTAINERGREY>
      <TEXTCONTAINER>
        <div className="__title">
          未来发展
        </div>
        <div className="__dsc">
          未来，多个国家的客户电话服务将同时上线。同时进一步优化整合供应链体系，整合全球资源为顾客带来更加出色的购物体验，为合作伙伴带来更多的机会与市场。
        </div>
      </TEXTCONTAINER>
    </CONTAINERGREY>
  </GREYSECTION>
  
</div>