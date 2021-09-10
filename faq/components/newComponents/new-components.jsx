import React, { useEffect, useState, Fragment } from 'react';
import style from './new-components.module.css';
import { useHistory, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import {FormattedMessage, injectIntl} from 'react-intl';
import {questions} from '../../data/index';

export const DropDownItem = (props) => {
    // console.log(props)
    const [showMore, setShowMore] = useState(false);

    const toDetail = (item) => {
        props.clickItem(item)
    }

    useEffect(()=>{
        if(props.open){
            setShowMore(true)
        }
    },[props.open])

    const DropDownPositionBox = styled.div`
        border-bottom: 1px solid #e6e6e6;
    `

    const DropDownItem = styled.div`
        display: flex;
        align-items: center;
        font-family: Roboto-Medium;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #222222;
        height: 48px;
        line-height: 48px;
    `

    const DropDownIcon = styled.span`
        @font-face {
            font-family: 'iconfont';  /* Project id 384296 */
            src: url('//at.alicdn.com/t/font_384296_waimmey03x.woff2?t=1631165132958') format('woff2'),
                url('//at.alicdn.com/t/font_384296_waimmey03x.woff?t=1631165132958') format('woff'),
                url('//at.alicdn.com/t/font_384296_waimmey03x.ttf?t=1631165132958') format('truetype');
        }
        font-family:"iconfont" !important;
        font-size:16px;
        font-style:normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: 20px;
        margin-right: 16px;
        color: #000;
        text-shadow: 0 0 black;
    `

    const DropDownTxt = styled.span`
        flex: 1;
        // text-shadow: 0 0 #222;
    `

    const DropDownShow = styled.span`
        @font-face {
            font-family: 'iconfont';  /* Project id 384296 */
            src: url('//at.alicdn.com/t/font_384296_9jjvzuj4fxt.woff2?t=1631168925174') format('woff2'),
                url('//at.alicdn.com/t/font_384296_9jjvzuj4fxt.woff?t=1631168925174') format('woff'),
                url('//at.alicdn.com/t/font_384296_9jjvzuj4fxt.ttf?t=1631168925174') format('truetype');
        }
        font-family:"iconfont" !important;
        font-size:16px;
        font-style:normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: 14px;
        margin-right: 14px;
        color: #666;
        // text-shadow: 0 0 black;
    `

    const MoreQuestion = styled.div`
        width: 100%;
        padding: 9px 21px;
        line-height: 32px;
        background: #f6f6f6;
        margin-bottom: 12px;

        &>span{
            width: 100%;
            line-height: 32px;
            font-family: Roboto-Regular;
            font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #222222;
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    `

    return (
        <DropDownPositionBox>
            <DropDownItem onClick={()=>setShowMore(!showMore)}>
                <DropDownIcon dangerouslySetInnerHTML={{__html:props.iconImg}}></DropDownIcon>
                <DropDownTxt>{props.title}</DropDownTxt>
                {
                    showMore ? 
                    <DropDownShow>&#xe77f;</DropDownShow> :
                    <DropDownShow>&#xe77e;</DropDownShow>
                }
            </DropDownItem>
            {
                (showMore && props.questionList && props.questionList.length > 0) &&  
                <MoreQuestion>
                    {
                        props.questionList.map((item, index) => {
                            return <span key={index} onClick={()=>toDetail(item)}>{item.title}</span>
                        })
                    }
                </MoreQuestion>
            }
            
        </DropDownPositionBox>
        
    )
}

export const EntryButton = (props) => {
    // console.log(props);
    const history = useHistory();
    const pageEntry = (url, title) => {
        console.log(url)
        history.push({pathname:url, params:{title: title}})
    }

    const EntryButton = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 169px;
        height: 88px;
        /* border: 1px solid; */
        background: #f6f6f6;
        font-family: Roboto-Regular;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 14px;
        letter-spacing: 0px;
        color: #222222;
        border-radius: 4px;
        margin-bottom: 12px;
    ` 

    const EntryIcon = styled.span`
        @font-face {
            font-family: 'iconfont';  /* Project id 384296 */
            src: url('//at.alicdn.com/t/font_384296_waimmey03x.woff2?t=1631165132958') format('woff2'),
                url('//at.alicdn.com/t/font_384296_waimmey03x.woff?t=1631165132958') format('woff'),
                url('//at.alicdn.com/t/font_384296_waimmey03x.ttf?t=1631165132958') format('truetype');
        }
        font-family:"iconfont" !important;
        font-size:16px;
        font-style:normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        fontSize:24px;
        display:inline-block;
        line-height: 20px;
    `

    return (
        <EntryButton onClick={()=> pageEntry(props.to,props.txt)}>
            {/* <img className={style.buttonImg} src={props.imgUrl} alt="" /> */}
            <EntryIcon style={{fontSize:'24px',marginBottom:'12px'}} dangerouslySetInnerHTML={{__html:props.imgUrl}}/>
            <span>{props.txt}</span>
        </EntryButton>
    )
}

const NewOrderList1 = class extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
  
      }
    }
  
    render () {
      const STATUS_PENDING = 1
      const STATUS_REVIEWING = 2
      const STATUS_PROCESSING = 3
      const STATUS_SHIPPED = 4
      const STATUS_PARTIALLY_REFUNDED = 5
      const STATUS_REFUNDED = 6
      const STATUS_CANCELED = 7
      const STATUS_HELD = 8
      const STATUS_CONFIRMED = 10

      // ToTal Order Status
      const TOTAL_STATUS_UNPAID = 0;       //未付款订单
      const TOTAL_STATUS_PROCCESSING = 1;      //仓库正在打包与包含废弃状态paid一起存在的订单
      const TOTAL_STATUS_SHIPPED = 2;      //运送中的订单
      const TOTAL_STATUS_CANCELED = 3;     //已取消订单
      const TOTAL_STATUS_REVIEW = 4;        //已完成订单
  
      const {intl} = this.props

      const OrderStatus = styled.span`
            color: #999;
        `

  const getMoney = money => money ? (money.unit + money.amount) : ''

  const New_order_list_li = styled.li`
    //   margin-top: 10px;
      background-color: #fff;
      padding-left: 10px;
      padding-right: 10px;
      cursor: pointer;
      border-bottom: 10px solid #f6f6f6;
      font-family: Roboto-Regular;
      &:last-child{
          border-bottom: none;
      }
      &:first-child{
          margin-top: 0;
      }
  `
  const New_order_list_item_title_box = styled.div`
      height: 42px;
      /* border-bottom: 1px solid #cacaca; */
      display: flex;
      align-items: center;
      justify-content: space-between;
  `
  const New_order_list_img_box = styled.div`
    //   margin-top: 6px;
      padding-bottom: 10px;
      border-bottom: 1px solid #e6e6e6;
  `
  const New_order_list_select = styled.div`
      display: inline-block;
      /* height: 80px; */
      top: -30px;
      position: relative;
  `
  const New_order_list_item = styled.div`
      /* flex: 1; */
      display: inline-block;
      width: calc(100% - 28px);
      ul{
          white-space: nowrap;
          overflow: hidden;
          overflow-x: scroll;
          width: 100%;
          height: 80px;
          /* border: 1px solid; */
      }
      ul::-webkit-scrollbar{
          display: none;
      }
      li{
          display: inline-block;
          margin-right: 8px;
      }
      img{
          width: 64px;
          height: 80px;
      }
  `
  const New_order_list_select_span = styled.div`
      font-size: 20px;
      display: inline-block;
      font-family: iconfont;
      font-style: normal;
      margin-right: 8px;
  `
  const New_order_list_total_box = styled.div`
      height: 42px;
      line-height: 42px;
      display: flex;
      justify-content: space-between;
      color: #999;
      font-size:12px;
      /* border-bottom: 10px solid #f6f6f6; */
  `
  
    const status = (value) => {
        let label
        switch (value) {
            case TOTAL_STATUS_UNPAID:
                label = <span>{intl.formatMessage({id: 'order_status_unpaid'})}</span>
                break
            case TOTAL_STATUS_PROCCESSING:
                label = <span>{intl.formatMessage({id: 'order_status_processing'})}</span>
                break
            case TOTAL_STATUS_SHIPPED:
                label = <span>{intl.formatMessage({id: 'order_status_shipped'})}</span>
                break
            case TOTAL_STATUS_CANCELED:
                label = <span>{intl.formatMessage({id: 'order_status_canceled'})}</span>
                break
            case TOTAL_STATUS_REVIEW:
                label = <span>{intl.formatMessage({id: 'order_status_confirmed'})}</span>
                break
        //   case STATUS_PENDING:
        //     label = <span>{intl.formatMessage({id: 'order_status_pendding'})}</span>
        //     break
        //   case STATUS_REVIEWING:
        //     label = <span>{intl.formatMessage({id: 'order_status_paid'})}</span>
        //     break
        //   case STATUS_PROCESSING:
        //     label = <span>{intl.formatMessage({id: 'order_status_processing'})}</span>
        //     break
        //   case STATUS_SHIPPED:
        //     label = <span>{intl.formatMessage({id: 'order_status_shipped'})}</span>
        //     break
        //   case STATUS_PARTIALLY_REFUNDED:
        //     label = <span>{intl.formatMessage({id: 'order_status_partially_refunded'})}</span>
        //     break
        //   case STATUS_REFUNDED:
        //     label = <span>{intl.formatMessage({id: 'order_status_refunded'})}</span>
        //     break
        //   case STATUS_CANCELED:
        //     label = <span>{intl.formatMessage({id: 'order_status_canceled'})}</span>
        //     break
        //   case STATUS_HELD:
        //     label = <span>{intl.formatMessage({id: 'order_status_held'})}</span>
        //     break
        //   case STATUS_CONFIRMED:
        //     label = <span>{intl.formatMessage({id: 'order_status_confirmed'})}</span>
        //     break
          default:
            label = ''
        }
  
        return label
    }
  
      const LabelValue = (props) => {
          if(props.style){
              return <span style={props.style}>
                          <label style={{marginRight: '5px'}}>{props.label}</label>
                          <span >{props.value}</span>
                      </span>
          } else {
              return <span style={props.style}>
                          <label style={{color: '#999', marginRight: '5px'}}>{props.label}</label>
                          <span >{props.value}</span>
                      </span>
          }
      }
  
        return <ul>
            {
                this.props.orders && this.props.orders.map(({selected, detail}) => (
                    <New_order_list_li key={detail.id} onClick={(evt) => { this.props.clickHandler(evt, detail) }}>
                        {/* "x-table __vm x-fw" */}
                      <New_order_list_item_title_box>
                        <div className="x-cell">
                          <LabelValue label={intl.formatMessage({id: 'orderno'})} value={detail.id}/>
                        </div>
                        <div className="x-cell" style={{textAlign: 'right'}}>
                          <OrderStatus>{status(detail.fulfillmentStatus)}</OrderStatus>
                        </div>
                      </New_order_list_item_title_box>
                      <New_order_list_img_box>
                        <New_order_list_select>
                            {
                              selected ?
                              <New_order_list_select_span style={selected ?{color: '#222'}: {color: '#cacaca'}}>&#xe658;</New_order_list_select_span>:
                              <New_order_list_select_span style={{color: '#cacaca'}}>&#xe65a;</New_order_list_select_span>
                            }
                        </New_order_list_select>
                        <New_order_list_item>
                            <ul>
                              {detail.orderItems.map((item, index) => (
                                  <li key={index}>
                                      <img src={item.productImageUrl}/>
                                  </li>
                              ))}
                            </ul>
                        </New_order_list_item>
                      </New_order_list_img_box>
                      <New_order_list_total_box>
                          <FormattedMessage id="count_items" values={{count: detail.orderItems.length}}/>
                          <LabelValue style={{color:"#222", fontWeight:'600'}} label={intl.formatMessage({id: 'ordertotal'})} value={getMoney(detail.orderTotal)}/>
                      </New_order_list_total_box>
                    </New_order_list_li>
                ))
            }
        </ul>
    }
}

export const NewOrderList = injectIntl(NewOrderList1)


const QuestionInputBox = styled.div`
        display: flex;
        border: 1px solid #222;
        width: 92%;
        margin: 0 auto;
        line-height: 38px;
        height: 38px;
        position: relative;
        input {
            border: none;
            outline: none;
            flex: 1;
            padding: 0 12px 0 12px;
            font-family: Roboto-Regular;
            font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #222222;
            line-height: 38px;
        }
        input::-webkit-input-placeholder{
            font-family: Roboto-Regular;
            font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #999999;
        }
    `
    const InputPositionBox = styled.div`
        flex: 1;
        position: relative;
        display: flex;
    `

    const ClearIcon = styled.span`
        @font-face {
            font-family: 'iconfont';  /* Project id 384296 */
            src: url('//at.alicdn.com/t/font_384296_waimmey03x.woff2?t=1631165132958') format('woff2'),
                url('//at.alicdn.com/t/font_384296_waimmey03x.woff?t=1631165132958') format('woff'),
                url('//at.alicdn.com/t/font_384296_waimmey03x.ttf?t=1631165132958') format('truetype');
        }
        font-family:"iconfont" !important;
        font-size:16px;
        font-style:normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        margin: 0 13px;
        color:rgba(34, 34, 34, 0.3);
    `

    const InputIconBox = styled.div`
        @font-face {
            font-family: 'iconfont';  /* Project id 384296 */
            src: url('//at.alicdn.com/t/font_384296_waimmey03x.woff2?t=1631165132958') format('woff2'),
                url('//at.alicdn.com/t/font_384296_waimmey03x.woff?t=1631165132958') format('woff'),
                url('//at.alicdn.com/t/font_384296_waimmey03x.ttf?t=1631165132958') format('truetype');
        }
        width: 15%;
        background: #222;
        color: #fff;
        text-align: center;
        span{
            font-family:"iconfont" !important;
            font-size:16px;
            font-style:normal;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
    `

    const SearchTipsBox = styled.div`
        width: 100.5%;
        max-height: 182px;
        overflow: hidden;
        overflow-y: scroll;
        position: absolute;
        left: -1px;
        top: 38px;
        border: 1px solid #cacaca;
        border-top: none;
        font-family: Roboto-Regular;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #666666;
        padding: 2px 15px 16px;
        background: #fff;
        z-index: 1;
        div{
            line-height: 29px;
            width: calc(100%);
            white-space: nowrap;
            overflow: hidden;
            display: block;
            text-overflow: ellipsis;
        }
        strong{
            color:#222;
        }
    `

const SearchBar1 = (props) => {
    console.log('searchbar:',props)
    const [showClear, setShowClear] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [searchTips, setSearchTips] = useState([]);

    useEffect(()=>{
        if(questions.length > 0){
            let list = [];
            for(let i = 0; i < questions.length; i++){
                if(questions.id!='root-7' && questions.id != 'root-8'){
                    list = list.concat(questions[i]['questions'])
                }
            }
            // console.log(list)
            setSearchTips(list)
        }
    },[])

    useEffect(()=>{
        if(props.value == 0){
            setInputValue('');
        }
        if(props.value){
            setInputValue(props.value);
            if(!props.stopSearch){
                props.search(props.value)
            }
        } 
    }, [props.value])

    const inputChange = (e) => {
        console.log(e.target.value)
        setInputValue(e.target.value)
    }

    const clear = () => {
        // console.log('clear');
        setInputValue("");
    }

    const search = () => {
        // console.log('com o=input', inputValue)
        props.search(inputValue)
    }

    const relatedSearch = (item) => {
        // console.log(item)
        setInputValue(item.title)
        props.history.push({pathname: `${(window.ctx || '')}/support/question/`, state:{id: item.id}})
        
    }

    const filter = (e) => {
        let value = e;
        let reg = new RegExp(''+inputValue+'', "ig")
        let after = e;
        if(inputValue){
            after = value.replace(reg, (e)=>{return'<strong>'+e+"</strong>"})
            if(after.indexOf('<strong>') != -1){
                return after
            }
        } else {
            return after
        }
    }    

    return(
        <QuestionInputBox>
            <InputPositionBox>
                <input type="text" 
                       placeholder="Popular Searches:Refund,Return,Shipping" 
                       onFocus={()=>setShowClear(true)} 
                       onBlur={()=>{setTimeout(()=>{setShowClear(false)},100)}}
                       value={inputValue}
                       onChange={(e)=>inputChange(e)}
                       style={{paddingRight:showClear?'0px':'12px'}}
                       />
                {
                    showClear&&
                    <ClearIcon onClick={()=>clear()}>&#xe7c5;</ClearIcon>
                }
            </InputPositionBox>
            {/* 搜索按钮 */}
            <InputIconBox onClick={()=>search()}>
                <span>&#xe61e;</span>
            </InputIconBox>
            {/* 搜索提示 */}
            {
                showClear && searchTips.length>0 &&
                <SearchTipsBox>
                    {
                        searchTips.map((item, index) => (
                            <div key={index} onClick={()=>{relatedSearch(item)}} dangerouslySetInnerHTML={{__html:filter(item.title)}}>
                                
                            </div> 
                        ))
                    }
                </SearchTipsBox>
            }
            
        </QuestionInputBox>
    )
}

export const SearchBar = withRouter(SearchBar1)

export const SelectType = (props) => {
    // console.log(props)

    const [select, setSelect] = useState(false)
    const [open, setOpen] = useState(false)

    const [type, setType] = useState(props ? props.type ? props.type : "order" : "order") // chat
    

    useEffect(()=>{
        if(props.type == "chat"){
            if(props.value){
                setSelect(props.itemList[props.value-0].label)
            } else {
                setSelect("Please select your question type")
            }
           
        } else if(props.itemList.length > 0){
            setSelect(props.itemList[0].label)
        }
    },[])
    

    const itemClick = (item) => {
        setSelect(item.label);
        setOpen(false);
        props.selectChange(item.value)
    }

    const SelectTypeBox = styled.div`
        width: 100%;
        padding: 0 4%;
        height: 38px;
        /* border: 1px solid; */
        position: relative;
    `
    const SelectInputBox = styled.div`
        width: 100%;
        height: 38px;
        border-radius: 2px;
        border: solid 1px #cacaca;
        /* background: url("https://image.geeko.ltd/site/pc/icon137.png") no-repeat scroll calc(100% - 10px) center transparent; */
        position: relative;
        -webkit-appearance: none; /*for chrome*/
        padding-left: 10px;
        line-height: 38px;
    `
    const SelectIcon = styled.img`
        position: absolute;
        right: 10px;
        top: calc(50% - 4px);
        width: 13px;
        height: 8px;
        transform: rotate(0);
        transition: all 0.2s linear;
    `
    const SelectOpen = styled.span`
        transform: rotate(180deg);
        transition: all 0.2s linear;
    `
    const SelectOptionBox = styled.div`
        background-color: #fff;
        position: absolute;
        top: 38px;
        left: 4%;
        width: 92%;
        min-height: 38px;
        line-height: 38px;
        border: 1px solid #cacaca;
        border-top: none;
        z-index: 1;
        /* padding: 0 10px; */
    `
    const SelectOption = styled.div`
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0 10px;
    `
    const Hover = styled.div`
        background-color: #f6f6f6;
    `
    const Radious = styled.div`
        width: 100%;
        height: 38px;
        border-radius: 2px;
        border: solid 1px #cacaca;
        /* background: url("https://image.geeko.ltd/site/pc/icon137.png") no-repeat scroll calc(100% - 10px) center transparent; */
        position: relative;
        -webkit-appearance: none; /*for chrome*/
        padding-left: 10px;
        line-height: 38px;
        border-radius: 19px;
        padding-left: 20px;
        .selectIcon{
            right: 20px;
        }
        &+.selectOptionBox{
            background-color: #fff;
            position: absolute;
            top: 38px;
            left: 8%;
            width: 84%;
            min-height: 38px;
            line-height: 38px;
            border: 1px solid #cacaca;
            border-top: none;
            z-index: 1;
        }
    `
    return(
        
        <SelectTypeBox>
            {
                type == "order" &&
                <Fragment>
                    <SelectInputBox onClick={() => setOpen(!open)}>
                        {select}
                        <SelectIcon style={{transform: open&&'rotate(180deg)',transition: open&&'all 0.2s linear'}} src="https://image.geeko.ltd/site/pc/icon137.png" alt="" />
                    </SelectInputBox>
                    {
                        open&&
                        <SelectOptionBox>
                            {
                                props.itemList.length > 0 && props.itemList.map((item, index)=>{
                                    return <SelectOption key={index} style={{backgroundColor: select==item.label?'#f6f6f6':''}} onClick={()=>itemClick(item)}>{item.label}</SelectOption>
                                })
                            }
                        </SelectOptionBox>
                    }
                </Fragment>
            }
            {
                type == "chat" &&
                <Fragment>
                    <Radious onClick={() => setOpen(!open)}>
                        {select}
                        <SelectIcon style={{right: '20px',transform: open&&'rotate(180deg)',transition: open&&'all 0.2s linear'}} src="https://image.geeko.ltd/site/pc/icon137.png" alt="" />
                    </Radious>
                    {
                        open&&
                        <SelectOptionBox style={{left: '8%',width: '84%'}}>
                            {
                                props.itemList.length > 0 && props.itemList.map((item, index)=>{
                                    return <SelectOption key={index} style={{backgroundColor: select==item.label?'#f6f6f6':''}} onClick={()=>itemClick(item)}>{item.label}</SelectOption>
                                })
                            }
                        </SelectOptionBox>
                    }
                </Fragment>
            }
            
            
        </SelectTypeBox>
    )
}