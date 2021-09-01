import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import style from './drop-down-item.module.css';



let questionListMock = [
    "How can I change or modify my order?",
    "How can I modify my shipping address?",
    "Can I cancel my order?"
]

const DropDownItem = (props) => {
    // console.log(props)
    const [showMore, setShowMore] = useState(false);
    const history = useHistory();

    const [questionList, setQuestionList] = useState(questionListMock);

    const showQuestions = (type) => {
        console.log(type)
        if(type == 'hide'){
            setShowMore(false)
        } else {
            setShowMore(true)
        }
    }

    const toDetail = (item) => {
        // history.push({pathname:"/question-detail",params:{aaa:'1111'}})
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
                            return <span key={index} onClick={()=>toDetail(item)}>{item}</span>
                        })
                    }
                </div>
            }
            
        </div>
        
    )
}


export default DropDownItem