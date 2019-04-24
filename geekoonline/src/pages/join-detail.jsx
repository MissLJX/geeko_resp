import React from 'react'
import { data } from '../store'
import {BANNER} from '../components/banner.jsx'
import {BLOCKIMAGE} from '../components/elements.jsx'
import Styled from 'styled-components'
import {CONTAINER} from '../components/layout.jsx'

const JOBS = Styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  & > li{
    width: 374px;
    margin-top: 55px;
  }
  @media (max-width: 1200px) {
    & > li{
      width: 100%;
      margin-top: 25px;
    }
  }
`

const JOB = Styled.div`
  height: 660px;
  background-color: #ffffff;
  box-shadow: 0px 6px 9px 0px  rgba(204, 204, 204, 0.5);
  position: relative;

  .__hd{
    position: relative;
    figcaption{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      font-size: 2.6rem;
      color: #f5f5f5;
      font-weight: bold;
      word-break: keep-all;
    }
  }

  .__bd{
    padding: 20px;
  }

  .__joinus{
    width: 160px;
    height: 30px;
    background-color: #222222;
    color: #fff;
    line-height: 30px;
    text-align:center;
    position: absolute;
    right: 20px;
    bottom: 20px;
  }
`

const JOBD = Styled.div`
  .__title{
    font-size: 1.2rem;
    line-height: 1.6rem;
    color: #222222;
    font-weight: bold;
  }
`

const DS = Styled.ul`
  & > li{
    font-size: 1.2rem;
    line-height: 1.5rem;
    color: #666666;
    list-style-type: decimal;
    list-style-position: inside;
  }
`

const JOBDS = Styled.ul`
  & > li{
    margin-top: 12px;
    &:first-child{
      margin-top: 0;
    }
  }
`

const Epy = ({job}) => <JOB>
  <figure className="__hd">
    <BLOCKIMAGE src={ job.image }/>
    <figcaption>
      {job.title}
    </figcaption>
  </figure>
  <div className="__bd">
    <JOBDS>
    {
      job.descriptions.map( d => <li key={d.id}>
        <JOBD>
          <div className="__title">{d.title}</div>
          <DS>
          {
            d.descriptions.map( (dd, i) => <li key={i}>
              {dd}
            </li>
            )
          }
          </DS>
        </JOBD>
      </li>
      )
    }
    </JOBDS>
  </div>
  <div className="__joinus">加入我们</div>
</JOB>

const DETAILCONTAINER = Styled.div`
    padding-bottom: 50px;
    @media (max-width: 1200px) {
      & > li{
        width: 100%;
        padding-bottom:30px;
      }
    }
`

const TAG = Styled.a`
    display: inline-block;
    width: 220px;
	  height: 30px;
    font-size: 1.6rem;
    text-align: center;
    line-height: 28px;
    border: solid 1px #666666;
    color: #222;
    text-decoration: none;
    &.selected{
      background-color: #222222;
      color: #ffffff;
    }
`

const TAGS = Styled.ul`
    margin-top: 20px;
    &::after{
      content:'';
      clear: both;
      display: block;
    }
    & > li{
      margin-top: 15px;
      margin-left: 25px;
      float: left;
      &:nth-child(5n+1){
        margin-left: 0;
      }
    }
    @media (max-width: 1200px) {
      & > li{
        float: none;
        margin-left: auto;
        text-align: center;
      }
    }
`

export default class extends React.Component{
  constructor(props){
    super(props)
    if (props.staticContext && props.staticContext.data) {
      this.state = {
        data: props.staticContext.data,
        selectedId: null
      };
    } else {
      this.state = {
        data: null,
        selectedId: null
      };
    }
  }

  componentDidMount() {

    const { match } = this.props
    const id = match.params.detail

    setTimeout(() => {
      if (window.__ROUTE_DATA__) {
        this.setState({
          data: window.__ROUTE_DATA__
        })
        delete window.__ROUTE_DATA__
      } else {
        this.setState({
          data: data[id]
        })
      }
    }, 0)
  }


  render(){
    return <DETAILCONTAINER>
      {
        this.state.data && <div>
          <section>
            <BANNER src={this.state.data.banner.pc} src1={this.state.data.banner.msite}/>
          </section>
          <CONTAINER>



          {
            this.state.data.jobs && <React.Fragment>
                <TAGS>
                {
                  this.state.data.jobs.map( job => <li key={job.id}>
                    <TAG onClick={ () => {this.setState({selectedId: job.id})}} className={this.state.selectedId === job.id ? 'selected' : ''} href={`#${job.id}`}>{job.title}</TAG>
                  </li>)
                }
                </TAGS>
                <JOBS>
                {
                  this.state.data.jobs.map( job => <li key={job.id} id={job.id}>
                    <Epy job={job}/>
                  </li>)
                }
              </JOBS>
            </React.Fragment>
          }
          </CONTAINER>
        </div>
      }
      
      
    </DETAILCONTAINER>
  }
}