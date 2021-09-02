import React from 'react';
import { useHistory } from 'react-router-dom';
import style from './entry-button.module.css';

const EntryButton = (props) => {
    // console.log(props);
    const history = useHistory();
    const pageEntry = (url, title) => {
        console.log(url)
        history.push({pathname:url, params:{title: title}})
    }

    return (
        <div className={style.EntryButton} onClick={()=> pageEntry(props.to,props.txt)}>
            {/* <img className={style.buttonImg} src={props.imgUrl} alt="" /> */}
            <span className={style.iconfont} dangerouslySetInnerHTML={{__html:props.imgUrl}}/>
            <span className={style.buttonTxt}>{props.txt}</span>
        </div>
    )
}


export default EntryButton