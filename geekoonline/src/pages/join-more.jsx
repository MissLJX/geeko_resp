import React from 'react'
import Styled from 'styled-components'
import { Link } from 'react-router-dom'
import { data,data2 } from '../store/index';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';

const JOINMORECONTAINER = Styled.div`
    margin-top: ${props => !props.isJoin?"89":"0"}px;
    @media (max-width: 1200px) {
        margin-top: ${props => !props.isJoin?"60":"0"}px;
    }
`;

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
      font-size: 14px;
      color: #222222;

      &::placeholder{
        color:#666666;
      }
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
          font-size: 13px;
          color: #666666;
          cursor: pointer;
          border: 1px solid #fff;
          border-radius:4px;

          & .__iconfont{
            display:none;
          }
  
          &.active{
            border: 1px solid #222;
            color: #222222;
            font-weight:bold;
            position:relative;

            & .__iconfont{
                display: inline-block;
                position: absolute;
                right: -8px;
                top: -8px;
                line-height: normal;
                width: 16px;
                border-radius: 50%;
                height:16px;
                line-height:16px;
                text-align:center;
                background-color:rgba(0,0,0,.5);

                & > span{
                    font-family: "iconfont";
                    color: #ffffff;
                    font-size: 12px;
                    display: inline-block;
                    transform: scale(0.8);
                    font-weight: bold;
                }

                // &::after{
                //     content:"x";
                //     color:#ffffff;
                //     top: -1px;
                //     position: relative;
                // }
            }
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
      font-size: 13px;
      text-align: center;

      & > span{
        vertical-align: middle;
      }

      & > .__icon{
          font-family:"iconfont";
          margin-left:10px;
      }
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
  &.__border{
    border-bottom:10px solid #f0f0f0;
  }

  ._content{
    padding:0px 20px 20px;

    ._item{
      display:flex;
      flex-wrap:wrap;
      align-items: center;
      border-bottom:1px solid #e6e6e6;
      padding-top: 10px;
      text-decoration: none;

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
        & > ._container{
          font-size: 14px;
          color: #4896D4;
          text-decoration: none;
          font-weight: bold;

          & > span{
            vertical-align: middle;

            &.__hot{
              display: inline-block;
              background: url(/images/icon/hot_icon.png) center/cover no-repeat;
              width: 20px;
              height: 20px;
              margin-left:3px;
            }
          }
        }
      }

      ._invite{
        font-size:14px;
        color:#999999;
        width:40%;
      }

      ._region{
        font-size:14px;
        color:#222222;
        font-weight:bold;
      }

      ._time{
        font-size:14px;
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
    &.__border{
      border-bottom:none;
    }

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

          & > ._container{
            font-size:18px;

            .__hot{
              display: inline-block;
              background: url(https://s3-us-west-2.amazonaws.com/image.chic-fusion.com/heatSearcher/99ebbfc0-e011-497c-b909-3d17770a663f) center/cover no-repeat;
              width: 20px;
              height: 20px;
            }
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

const GOBACKHISTORY = Styled.p`
  font-size:14px;
  color:#222222;
  font-weight:bold;
  margin-bottom:10px;

  & > *{
      cursor:pointer;
  }

  @media (min-width: 1200px) {
      font-size:18px;
  }
`;

export default withRouter(class extends React.Component{
  constructor(props){
    super(props);

    let socialData = data.reduce(function(preValue,currentValue){
      return [...preValue,...currentValue.jobs]
    },[]);

    let schoolData = data2.reduce(function(preValue,currentValue){
      return [...preValue,...currentValue.jobs]
    },[]);

    this.state = {
      selectedcity: 's',
      showMap: false,
      selectedInvite:0,
      selectedCity:'',
      searchValue:'',
      searchResult:null,
      flagClickSearch:false,
      socialData:socialData,
      schoolData:schoolData
    }

    this.changeInput = this.changeInput.bind(this);
    this.changeSelectedCity = this.changeSelectedCity.bind(this);
    this.searchEvent = this.searchEvent.bind(this);
    this.changeSelectedInvite = this.changeSelectedInvite.bind(this);
    this.selectChangeCity = this.selectChangeCity.bind(this);
    this.moreGoBack = this.moreGoBack.bind(this);
  }

  componentDidMount(){
    this.setState((state, props) => {
      let data = state.socialData;
      if(!!this.props.isJoin){
        data = state.socialData.slice(0,6);
      }
      return {...state,searchResult:data}
    });
  }

  changeInput(evt){
    this.setState({
      searchValue:evt.target.value
    });
  }

  changeSelectedCity(evt,value){
    evt.stopPropagation();
    this.setState({
      selectedCity:value
    });
  }

  selectChangeCity(evt){
    let value = parseInt(evt.target.value);
    this.setState({
      selectedCity:value
    });
  }

  changeSelectedInvite(value){
    this.setState({
      selectedInvite:value
    },() =>{
      this.searchEvent(false,false);
    });
  }

  searchEvent(flag,isButton){
    let state = this.state;
    let data = state.selectedInvite==0?state.socialData:state.schoolData;
    let disposeData = _.cloneDeep(data);
    let flag2 = false;
    if(!flag && state.searchValue){
      flag2 = true;
      disposeData = disposeData.filter(item=>item.title.includes(state.searchValue));
    }

    if(!flag && !!state.selectedCity){
      flag2 = true;
      disposeData = disposeData.filter(item=>item.regionType==state.selectedCity);
    }

    if(!!this.props.isJoin && !isButton){
        disposeData = disposeData.slice(0,6)
    }

    this.setState({
      searchResult:disposeData,
      flagClickSearch:flag2
    });
  }

  moreGoBack(){
    const { history } = this.props;
    history.goBack();
  }

  render(){
    const { isJoin } = this.props;
    return <JOINMORECONTAINER isJoin={isJoin}>
      <section>
        <SEARCHCONTAINER>
          <JSONBIGCONTAINER>
            {
                !isJoin && <GOBACKHISTORY>
                    <span onClick={this.moreGoBack}>{'<'} 返回</span>
                </GOBACKHISTORY>
            }
            

            <div className='screen-container'>
              <input 
                type="text" 
                placeholder='请输入搜索关键词' 
                value={this.state.searchValue}
                onChange={this.changeInput}
              />
              <div className="_container">
                <p className='title'>工作城市：</p>
                <div className='content'>
                  <span 
                    className={this.state.selectedCity==1?"active":""}
                    onClick={(e)=>this.changeSelectedCity(e,1)}
                  >
                    <span>上海市</span>
                    <span className='__iconfont' onClick={(e)=>this.changeSelectedCity(e,0)}><span>&#xe69a;</span></span>
                  </span>
                  <span 
                    className={this.state.selectedCity==3?"active":""}
                    onClick={(e)=>this.changeSelectedCity(e,3)}
                  >
                    <span>南京市</span>
                    <span className='__iconfont' onClick={(e)=>this.changeSelectedCity(e,0)}><span>&#xe69a;</span></span>
                </span>
                <span 
                    className={this.state.selectedCity==2?"active":""}
                    onClick={(e)=>this.changeSelectedCity(e,2)}
                  >
                    <span>广州市</span>
                    <span className='__iconfont' onClick={(e)=>this.changeSelectedCity(e,0)}><span>&#xe69a;</span></span>
                </span>
                  <span 
                    className={this.state.selectedCity==4?"active":""}
                    onClick={(e)=>this.changeSelectedCity(e,4)}
                  >
                    <span>肇庆市</span>
                    <span className='__iconfont' onClick={(e)=>this.changeSelectedCity(e,0)}><span>&#xe69a;</span></span>
                  </span>
                </div>
              </div>

              <div className='_container2'>
                <select name="select" onChange={this.selectChangeCity}>
                  <option value={0}>工作城市</option>
                  <option value={1}>上海市</option>
                  <option value={3}>南京市</option>
                  <option value={2}>广州市</option>
                  <option value={4}>肇庆市</option>
                </select>
              </div>

              <button onClick={()=>this.searchEvent(false,true)}>
                <span>搜索职位</span>
                <span className='__icon'>&#xe772;</span>
              </button>
            </div>

            <div className='_header'>
              <div className='_content'>
                <div 
                  className={this.state.selectedInvite==0?"active":""}
                  onClick={()=>this.changeSelectedInvite(0)}
                >
                  <span>社会招聘</span>
                </div>

                <div 
                  className={this.state.selectedInvite!=0?"active":""}
                  onClick={()=>this.changeSelectedInvite(1)}
                >
                  <span>校园招聘</span>
                </div>
              </div>
            </div>
          </JSONBIGCONTAINER>
        </SEARCHCONTAINER>
      </section>

      <section>
        <SEARCHRESULR className={isJoin?"__border":""}>
          <JSONBIGCONTAINER>
          <ul className='_content'>
              {
                this.state.searchResult && this.state.searchResult.length > 0 ? (
                  <React.Fragment>
                    {
                      this.state.searchResult.map(item =>{
                        return <li key={item.id}>
                                <Link to={{pathname:`/join/${this.state.selectedInvite}/${item.regionType}/${item.id}`,state:{data:item,type:this.state.selectedInvite}}} className='_item'>
                                  <p className='_title'>
                                    <span className='_container'>
                                      <span>{item.title}</span>
                                      
                                      {
                                        item.isHot && <span className='__hot'></span>
                                      }
                                    </span>
                                  </p>
                                  <p className='_invite __pc'>{this.state.selectedInvite==0?"社会招聘":"校园招聘"}</p>
                                  <p className='_region __pc'>
                                    {
                                      item.regionType == 1 && <span>上海市</span>
                                    }
                                    {
                                      item.regionType == 3 && <span>南京市</span>
                                    }
                                    {
                                      item.regionType == 2 && <span>广州市</span>
                                    }
                                    {
                                      item.regionType == 4 && <span>肇庆市</span>
                                    }
                                  </p>
                                  <p className='_time'>发布时间:{item.time}</p>
                                </Link>
                              </li>
                      })
                    }

                    {
                        isJoin && <li>
                            <Link to="/join-more" className='more-post'>
                            <span>查看{this.state.flagClickSearch?"其他":"更多"}职位信息 {'>>'}</span>
                            </Link>
                        </li>
                    }
                    
                  </React.Fragment>
                ) : (
                  <div className='empty-result'>
                    <span>暂无职位</span>
                  </div>
                )
              }
            </ul>
          </JSONBIGCONTAINER>
        </SEARCHRESULR>
      </section>
  </JOINMORECONTAINER>
  }
});

