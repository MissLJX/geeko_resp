import React, { useEffect, useState, useRef } from 'react';
import style from './search-bar.module.css'
import {questions} from '../../data/index';


const SearchBar = (props) => {
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
    },[questions])

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
        // props.search(item.title)
        
        window.location.href = '/supportnew/question1/'+item.id+"?search="+JSON.stringify(item.title);
        
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

export default SearchBar