import React, { useEffect, useState, useRef, Fragment } from 'react';
import style from './select-type.module.css'


const SelectType = (props) => {
    // console.log(props)

    const [select, setSelect] = useState(false)
    const [open, setOpen] = useState(false)

    const [type, setType] = useState(props ? props.type ? props.type : "order" : "order") // chat
    

    useEffect(()=>{
        if(props.type == "chat"){
            setSelect("Please select your question type")
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

export default SelectType