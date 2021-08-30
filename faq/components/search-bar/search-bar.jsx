import React, { useEffect, useState, useRef } from 'react';
import style from './search-bar.module.css'


const SearchBar = (props) => {
    // console.log(props)
    const [showClear, setShowClear] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [searchTips, setSearchTips] = useState([
            {tips:"How can I change or modify my order?"},
            {tips:"How can I change or modify my order?"},
            {tips:"How can I change or modify my order?"},
            {tips:"How can I change or modify my order?"},
            {tips:"How can I change or modify my order?"},
            {tips:"How can I change or modify my order?"},
            {tips:"How can I change or modify my order?"},
            {tips:"How can I change or modify my order?"},
            {tips:"How can I change or modify my order?"}
        ]);

    useEffect(()=>{
    },[inputValue])

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
        console.log(item)
        setInputValue(item.tips)
        props.search(item.tips)
    }

    const filter = (e, key) => {
        if(e == inputValue){
            return <strong key={key}>{e}</strong>
        } else {
            return <span key={key}>{e}</span>
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
                            <div className={style.tipItem} key={index} onClick={()=>{relatedSearch(item)}}>
                                {item.tips.split(" ").map((item1,key)=>(
                                    filter(item1,key)
                                ))}
                            </div> 
                        ))
                    }
                </div>
            }
            
        </div>
    )
}

export default SearchBar