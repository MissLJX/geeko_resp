import React, { useEffect } from 'react';
import style from './page-contanier.module.css';

const PageContanier1 = (props) => {
    // console.log(props)
    return (
        <div className={style.pageContanier} style={props?props.style?props.style:{border:'none'}:{border:'none'}}>
            {props.children}



        </div>
    )
}

export default PageContanier1