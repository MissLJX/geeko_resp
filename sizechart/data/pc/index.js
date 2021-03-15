import sizeData from '../size.js'
import imgData from '../image.js'
import axios from "../../src/api/apiconfigs";
import _ from 'lodash'
import getRightSize from '../../src/util/utils.js'

// let imgSrc = [];
// let result = [];
// let pMethod = [];
// 12f2f842-4bbb-4175-8741-7d82abb7807f   a069ce60-5107-4bee-8e1e-142bbfe9b93b
// axios.get('/productCategory/anon/get-taglia?productId='+"a069ce60-5107-4bee-8e1e-142bbfe9b93b").then(function (response) {
//     const pMethods = "dress"
//     pMethod.push(pMethods)
//     imgSrc.push(imgData['imgData'][pMethods]);

//     let pmethod = 'size';
//     if(pMethods==='shoes'){
//         pmethod='shoeSize'
//     }
//     let productVO=[];
//     const labelArr = [];
//     const sizeArr = [];
//     const changeArr = [];
//     // 12f2f842-4bbb-4175-8741-7d82abb7807f   a069ce60-5107-4bee-8e1e-142bbfe9b93b
//     axios.get('/v9/product/anon/'+"a069ce60-5107-4bee-8e1e-142bbfe9b93b"+'/show').then(function ({result: productVO}) {
//         let product = _.uniqBy(productVO.product.variants,'size')
//         for(let i= 0 ; i <product.length;i++ ){
//             const valArr = [];
//             valArr.push(product[i].size);
//             labelArr.push(sizeData['sizedata'][pmethod].find((n)=>n["value"]===product[i].size2)["label"]);
//             sizeArr.push(sizeData['sizedata'][pmethod].find((n)=>n["value"]===product[i].size2)["sizeMap"]);
//             if(product[i].descriptionMaps){
//                 const thisArr = [];
//                 for(let j=0;j<2;j++){
//                     thisArr.push(product[i].descriptionMaps[j])
//                 }
//                 changeArr.push(...[thisArr])
//             }else {
//                 changeArr.push('');
//             }
//             result.push([labelArr[i],sizeArr[i],changeArr[i]]);
//         }
//     })
// })

// "a069ce60-5107-4bee-8e1e-142bbfe9b93b"


const getTaglia = productId => {
    return axios.get(`/productCategory/anon/get-taglia?productId=${productId}`).then(response => response.result)
}

const getProduct = productId => {
    return axios.get(`/v9/product/anon/${productId}/show`).then(response => response.result)
}


export const getData = async productId => {

    let imgSrc = [];
    let result = [];
    let pMethod = [];

    const pMethods = await getTaglia(productId)
    const productVO = await getProduct(productId)

    pMethod.push(pMethods)
    imgSrc.push(imgData['imgData'][pMethods]);

    let pmethod = 'size';
    if(pMethods==='shoes'){
        pmethod='shoeSize'
    }else if(pMethods === null){
        return;
    }

    const labelArr = [];
    const sizeArr = [];
    const changeArr = [];

    let product = _.uniqBy(productVO.product.variants,'size');

    if(pmethod === "size"){
        product = getRightSize(product);
    }
    
    for(let i= 0 ; i <product.length;i++ ){
        const valArr = [];
        valArr.push(product[i].size);
        labelArr.push(sizeData['sizedata'][pmethod].find((n)=>n["value"]===product[i].size2)["label"]);
        sizeArr.push(sizeData['sizedata'][pmethod].find((n)=>n["value"]===product[i].size2)["sizeMap"]);
        if(product[i].descriptionMaps){
            const thisArr = [];
            for(let j=0;j<2;j++){
                thisArr.push(product[i].descriptionMaps[j])
            }
            changeArr.push(...[thisArr])
        }else {
            changeArr.push('');
        }
        result.push([labelArr[i],sizeArr[i],changeArr[i]]);
    }
    // console.log("result",result);
    return {
        result,
        imgSrc,
        pMethod,
    }


}



// export default {
//     result,
//     imgSrc,
//     pMethod
// }
