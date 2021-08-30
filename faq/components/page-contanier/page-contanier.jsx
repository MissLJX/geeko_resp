import React from 'react';
import style from './page-contanier.module.css';

const PageContanier1 = (props) => {
    console.log(props)
    return (
        <div className={style.pageContanier}>
            {props.children}



        </div>
    )
}

export default PageContanier1