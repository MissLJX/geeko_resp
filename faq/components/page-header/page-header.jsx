import React from 'react';
import {withRouter} from 'react-router-dom'
import style from './page-header.module.css';

const PageHeader1 = (props) => {
    return <div className={style.header}>
        <span>{props.label}</span>
  		 <i className={style.iconfont} onClick={() => {
  		 	if (props.to) {
  		 		props.history.replace(props.to)
  		 	} else if (props.href) {
  		 		window.location.href = props.href
  		 	} else {
  		 		props.history.goBack()
  		 	}
  		 }}>&#xe78a;</i>
  		 <strong onClick={() => {
  		 	if (props.to) {
  		 		props.history.replace(props.to)
  		 	} else if (props.href) {
  		 		window.location.href = props.href
  		 	} else {
  		 		props.history.goBack()
  		 	}
  		 }}>{props.tool}</strong>
    </div>
}

export default withRouter(PageHeader1);
