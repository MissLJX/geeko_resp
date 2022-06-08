import React from 'react'
import { data,data2,geekoHonor } from '../store'
import {BLOCKIMAGE} from '../components/elements.jsx'
import Styled from 'styled-components'
import {CONTAINER} from '../components/layout.jsx'
import JoinForm from '../components/join-form.jsx'

const DETAILCONTAINER = Styled.div`
    padding-bottom: 50px;
    margin-top:89px;
    background-color:#f0f0f0;
    min-height:100vh;
    @media (max-width: 1200px) {
      background-color:#ffffff;
      margin-top:60px;
      & > li{
        width: 100%;
        padding-bottom:30px;
      }
    }
`

const FIXEDWINDOW = Styled.div`
    position: fixed;
    z-index:10;
    background-color: rgba(0, 0, 0, .4);
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;

    .__window{
      position: absolute;
      width: 589px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      padding: 40px;
      background-color: #f2f2f2;

      .__close{
        position: absolute;
        right: 5px;
        top: 5px;
        font-size: 18px;
        font-family: iconfont;
        cursor: pointer;
      }
    }

    

    @media (max-width: 1200px) {
      .__window{
        padding: 25px 25px 20px 25px;
        width: 90%;
      }
    }
`

const GOBACKHISTORY = Styled.div`
    background-color:#f0f0f0;
    padding:15px 0px 15px 20px;
    font-size:14px;
    font-weight:bold;
    color:#222222;
    cursor:pointer;
    margin-left: -20px;
    margin-right: -20px;

    @media (min-width: 1200px) {
      padding-left:0;
      font-size:16px;
      margin:0;
    }
`;

const BANNER = Styled.div`
  ._container{
    display:flex;
    align-items: center;
    margin-bottom:50px;

    ._title{
      font-size:28px;
      font-weight:bold;
    }

    ._city{
      font-size:20px;
      margin-left:20px;
      color:#666666;
      font-weight:bold;
    }
  }

  @media (max-width: 1200px) {
    background: url(${props => props.src1}) center/100% 150px no-repeat;
    min-height:150px;
    display:flex;
    align-items: center;
    justify-content: center;
    margin: 0 -20px;

    ._container{
      text-align:center;
      display:block;
      margin-bottom:0px;
      ._title{
        font-size: 20px;
        color: #fff;
        font-weight: bold;
      }

      ._city{
        margin-top:13px;
        display: inline-block;
        background-color: #fff;
        color: #222;
        padding: 2px 15px;
        border-radius: 10px;
        font-weight: bold;
        text-align: center;
        margin-left:0px;
        font-size:14px;
      }
    }
  }
`;

const JOBDESCRIPTION = Styled.div`
    margin-top:20px;
    ._title{
      font-size:20px;
      // font-weight:bold;
      color:#222222;
    }

    ._content{
      margin-top:15px;
      .__title{
        font-size:14px;
        color:#666666;
        // font-weight:bold;
      }

      ._description,._item{
        font-size:14px;
        color:#666666;
        // font-weight:bold;
      }
    }

    @media (min-width: 1200px) {
      margin-top:0px;
    }
`;

const MOREJOBHREF = Styled.a`
  display: inline-block;
  width: 100%;
  background-color: #f4f4f5;
  height: 36px;
  line-height: 36px;
  text-align: center;
  text-decoration: none;
  color: #222;
  font-weight: bold;
  margin-top: 20px;

  @media (min-width: 1200px) {
    width:240px;
  }
`;

const JOINUS = Styled.div`
    margin-top:20px;

    button{
      display:inline-block;
      width: 100%;
      border: none;
      box-shadow: none;
      outline: none;
      background-color: #222;
      color: #fff;
      height: 36px;
      line-height: 36px;
      text-align: center;
      font-size: 16px;
    }

    @media (min-width: 1200px) {
      position: absolute;
      top: 40px;
      right: 30px;
      width: 160px;
      margin-top:0px;

      button{
        width: 160px;
        font-size: 20px;
        font-weight: bold;
        border-radius: 4px;
      }
    }
`;

const PRIVATECONTAINER = Styled.div`
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
  background-color:#ffffff;
  padding:40px 20px;
  position:relative;

  @media (max-width: 1200px) {
    padding: 0px 20px;
    width: 100%;
  }
`;

export default class extends React.Component{
  constructor(props){
    super(props)
    if (props.staticContext && props.staticContext.data) {
      this.state = {
        data: props.staticContext.data,
        selectedId: null,
        position: '招聘'
      };
    } else {
      this.state = {
        data: null,
        selectedId: null,
        geekoHonor:geekoHonor,
        show: true,
      };
    }
    this.joinHandle = this.joinHandle.bind(this);
    this.moreGoBack = this.moreGoBack.bind(this);
    this.moreEvent = this.moreEvent.bind(this);
  }

  componentDidMount() {
    const { location , match } = this.props
    let jobItem;
    if(!location.state){
      const { params } = match;
      const disposeData = params.type == 0 ? data : data2;
      const disposeitem = disposeData.find(item =>item.regionType == params.regionType);
      jobItem = disposeitem.jobs.find(item=>item.id==params.detail);
    }else{
      jobItem = location.state.data;
    }
    
    

    setTimeout(() => {
      if (window.__ROUTE_DATA__) {
        this.setState({
          data: window.__ROUTE_DATA__
        })
        delete window.__ROUTE_DATA__
      } else {
        this.setState({
          data: jobItem,
        })
      }
    }, 0)
  }

  joinHandle(position){
    this.setState({
      show: true,
      position
    })
  }

  moreGoBack(){
    const { history } = this.props;
    history.goBack();
  }

  moreEvent(evt){
    evt.preventDefault();
    const { history } = this.props;
    history.push("/join-more");
  }

  render(){
    const { geekoHonor } = this.state;
    return <DETAILCONTAINER>
      <CONTAINER>
        <GOBACKHISTORY>
          <span onClick={this.moreGoBack}>{'<'} 返回职位列表</span>
        </GOBACKHISTORY>
      </CONTAINER>
      
      {
        this.state.data && <div>
          <PRIVATECONTAINER>
            <BANNER src1={this.state.data.image}>
              <div className='_container'>
                <p className='_title'>{this.state.data.title}</p>
                <span className='_city'>
                {
                  this.state.data.regionType == 1 && <span>上海市</span>
                }
                {
                  this.state.data.regionType == 3 && <span>南京市</span>
                }
                {
                  this.state.data.regionType == 2 && <span>广州市</span>
                }
                {
                  this.state.data.regionType == 4 && <span>肇庆市</span>
                }
                </span>
              </div>
            </BANNER>

              <JOBDESCRIPTION>
                <div className='_title'>职位描述</div>

                {
                  this.state.data.descriptions.map((item,index) =>{
                    return <div className='_content' key={item.id+index}>
                        <div className='__title'>
                          <span>【{item.title}】</span>
                        </div>
      
                        <div className='_description'>
                          {
                            item.descriptions.map((item2,index2) =>{
                              return <p className='_item' key={item2+index2}>{item2}</p>;
                            })
                          }
                        </div>
                      </div>
                  })
                }
                
              </JOBDESCRIPTION>
                
              {
                geekoHonor && <JOBDESCRIPTION>
                  <div className='_title'>{geekoHonor.title}</div>

                  <div className='_content'>
                    <div className='_description'>
                        {
                          geekoHonor.descrptions.map((item,index) =>{
                            return <p className='_item' key={item+index}>{item}</p>;
                          })
                        }
                    </div>
                  </div>
                </JOBDESCRIPTION>
              }

              <MOREJOBHREF href='/' onClick={this.moreEvent}>
                <span>查看更多职位信息 {'>>'}</span>
              </MOREJOBHREF>

              <JOINUS>
                <button onClick={()=>this.joinHandle(this.state.data.title)}>加入我们</button>
              </JOINUS>
          </PRIVATECONTAINER>
        </div>
      }


      {
        this.state.show && <FIXEDWINDOW>
          <div className="__window">
            <JoinForm position={this.state.position}/>
            <span className="__close" onClick={ () => {this.setState({show: false})}}>&#xe69a;</span>
          </div>
        </FIXEDWINDOW>
      }
    </DETAILCONTAINER>
  }
}