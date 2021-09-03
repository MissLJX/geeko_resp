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

    return (
        <div className={style.dropDownPositionBox}>
            <div className={style.dropDownItem} onClick={()=>setShowMore(!showMore)}>
                <span className={`${style.iconfont} ${style.dropDownIcon}`} dangerouslySetInnerHTML={{__html:props.iconImg}}></span>
                <span className={style.dropDownTxt}>{props.title}</span>
                {
                    showMore ? 
                    <span className={`${style.iconfont} ${style.show}`}>&#xe6ba;</span> :
                    <span className={`${style.iconfont} ${style.show}`}>&#xe6b9;</span>
                }
            </div>
            {
                (showMore && props.questionList && props.questionList.length > 0) &&  
                <div className={style.moreQuestion}>
                    {
                        props.questionList.map((item, index) => {
                            return <span key={index} onClick={()=>toDetail(item)}>{item.title}</span>
                        })
                    }
                </div>
            }
            
        </div>
        
    )
}

export const EntryButton = (props) => {
    // console.log(props);
    const history = useHistory();
    const pageEntry = (url, title) => {
        console.log(url)
        history.push({pathname:url, params:{title: title}})
    }

    return (
        <div className={style.EntryButton} onClick={()=> pageEntry(props.to,props.txt)}>
            {/* <img className={style.buttonImg} src={props.imgUrl} alt="" /> */}
            <span className={style.iconfont} style={{fontSize:'24px',marginBottom:'10px'}} dangerouslySetInnerHTML={{__html:props.imgUrl}}/>
            <span className={style.buttonTxt}>{props.txt}</span>
        </div>
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
  
      const {intl} = this.props
  
        const status = (value) => {
          let label
        switch (value) {
          case STATUS_PENDING:
            label = intl.formatMessage({id: 'order_status_pendding'})
            break
          case STATUS_REVIEWING:
            label = intl.formatMessage({id: 'order_status_paid'})
            break
          case STATUS_PROCESSING:
            label = intl.formatMessage({id: 'order_status_processing'})
            break
          case STATUS_SHIPPED:
            label = intl.formatMessage({id: 'order_status_shipped'})
            break
          case STATUS_PARTIALLY_REFUNDED:
            label = intl.formatMessage({id: 'order_status_partially_refunded'})
            break
          case STATUS_REFUNDED:
            label = intl.formatMessage({id: 'order_status_refunded'})
            break
          case STATUS_CANCELED:
            label = intl.formatMessage({id: 'order_status_canceled'})
            break
          case STATUS_HELD:
            label = intl.formatMessage({id: 'order_status_held'})
            break
          case STATUS_CONFIRMED:
            label = intl.formatMessage({id: 'order_status_confirmed'})
            break
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
  
        const OrderStatus = styled.span`
            color: #666;
        `

        const getMoney = money => money ? (money.unit + money.amount) : ''
  
        return <ul className={style.new_order_list_ul}>
            {
                this.props.orders && this.props.orders.map(({selected, detail}) => (
                    <li className={style.new_order_list_li} key={detail.id} onClick={(evt) => { this.props.clickHandler(evt, detail) }}>
                        {/* "x-table __vm x-fw" */}
                      <div className={style.new_order_list_item_title_box}>
                        <div className="x-cell">
                          <LabelValue label={intl.formatMessage({id: 'orderno'})} value={detail.id}/>
                        </div>
                        <div className="x-cell" style={{textAlign: 'right'}}>
                          <OrderStatus>{status(detail.status)}</OrderStatus>
                        </div>
                      </div>
                      <div className={style.new_order_list_img_box}>
                        <div className={style.new_order_list_select}>
                            {
                              selected ?
                              <span className={`${style.new_order_list_select_span} ${selected ? style.selected:''}`}>&#xe658;</span>:
                              <span className={`${style.new_order_list_select_span} `}>&#xe65a;</span>
                            }
                          
                        </div>
                        <div className={style.new_order_list_item}>
                            <ul>
                              {detail.orderItems.map((item, index) => (
                                  <li key={index}>
                                      <img src={item.productImageUrl}/>
                                  </li>
                              ))}
                            </ul>
                        </div>
                      </div>
                      <div className={style.new_order_list_total_box}>
                          <FormattedMessage id="count_items" values={{count: detail.orderItems.length}}/>
                          <LabelValue style={{color:"#222", fontWeight:'600'}} label={intl.formatMessage({id: 'ordertotal'})} value={getMoney(detail.orderTotal)}/>
                      </div>
                    </li>
                ))
            }
        </ul>
    }
  }

export const NewOrderList = injectIntl(NewOrderList1)


const SearchBar1 = (props) => {
    console.log(props)
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
        
        if(props.value){
            setInputValue(props.value);
            if(!props.stopSearch){
                props.search(props.value)
            }
        }
    }, [props.value])

    const inputChange = (e) => {
        // console.log(e.target.value)
        setInputValue(e.target.value)
    }

    const clear = () => {
        // console.log('clear');
        setInputValue("");
    }

    const search = () => {
        props.search(inputValue)
    }

    const relatedSearch = (item) => {
        // console.log(item)
        setInputValue(item.title)
        props.history.push({pathname:'/supportnew/question1/', state:{id: item.id, search: JSON.stringify(item.title)}})
        
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
        <div className={style.questionInputBox}>
            <div className={style.inputPositionBox}>
                <input type="text" 
                       placeholder="Popular Searches:Refund,Return,Shipping" 
                       onFocus={()=>setShowClear(true)} 
                       onBlur={()=>{setTimeout(()=>{setShowClear(false)})}}
                       value={inputValue}
                       onChange={(e)=>inputChange(e)}
                       />
                {
                    showClear&&
                    <span className={`${style.span} ${style.iconfont}`} onClick={()=>clear()}>&#xe7c5;</span>
                }
            </div>
            {/* 搜索按钮 */}
            <div className={style.inputIconBox} onClick={()=>search()}>
                <span className={style.iconfont}>&#xe61e;</span>
            </div>
            {/* 搜索提示 */}
            {
                showClear && searchTips.length>0 &&
                <div className={style.searchTipsBox}>
                    {
                        searchTips.map((item, index) => (
                            <div className={style.tipItem} key={index} onClick={()=>{relatedSearch(item)}} dangerouslySetInnerHTML={{__html:filter(item.title)}}>
                                
                            </div> 
                        ))
                    }
                </div>
            }
            
        </div>
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
    return(
        
        <div className={style.selectTypeBox}>
            {
                type == "order" &&
                <Fragment>
                    <div className={style.selectInputBox} onClick={() => setOpen(!open)}>
                        {select}
                        <img className={`${style.selectIcon} ${open ? style.selectOpen : ''}`} src="https://image.geeko.ltd/site/pc/icon137.png" alt="" />
                    </div>
                    {
                        open&&
                        <div className={style.selectOptionBox}>
                            {
                                props.itemList.length > 0 && props.itemList.map((item, index)=>{
                                    return <div key={index} className={`${style.selectOption} ${select==item.label?style.hover:''}`} onClick={()=>itemClick(item)}>{item.label}</div>
                                })
                            }
                        </div>
                    }
                </Fragment>
            }
            {
                type == "chat" &&
                <Fragment>
                    <div className={`${style.selectInputBox} ${style.radious}`} onClick={() => setOpen(!open)}>
                        {select}
                        <img className={`${style.selectIcon} ${open ? style.selectOpen : ''}`} src="https://image.geeko.ltd/site/pc/icon137.png" alt="" />
                    </div>
                    {
                        open&&
                        <div className={style.selectOptionBox}>
                            {
                                props.itemList.length > 0 && props.itemList.map((item, index)=>{
                                    return <div key={index} className={`${style.selectOption} ${select==item.label?style.hover:''}`} onClick={()=>itemClick(item)}>{item.label}</div>
                                })
                            }
                        </div>
                    }
                </Fragment>
            }
            
            
        </div>
    )
}