import sizeData from './size.js'
import imgData from './image.js'
import axios from "../src/api/apiconfigs";
import _ from 'lodash'

let imgSrc = [];
let result = [];
let pMethod = [];

axios.get('/productCategory/anon/get-taglia?productId='+productId).then(function (response) {
    const pMethods = response.result;
    pMethod.push(pMethods)
    imgSrc.push(imgData['imgData'][pMethods]);

    let pmethod = 'size';
    if(pMethods==='shoes'){
        pmethod='shoeSize'
    }
    let productVO=[];
    const labelArr = [];
    const sizeArr = [];
    const changeArr = [];

    axios.get('/v9/product/anon/'+productId+'/show').then(function ({result: productVO}) {
        let product = _.uniqBy(productVO.product.variants,'size')
        for(let i= 0 ; i <product.length;i++ ){
            const valArr = [];
            valArr.push(product[i].size);
            labelArr.push(sizeData['sizedata'][pmethod].find((n)=>n["value"]===product[i].size)["label"]);
            sizeArr.push(sizeData['sizedata'][pmethod].find((n)=>n["value"]===product[i].size)["sizeMap"]);
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
    })
})

export default {
    result,
    imgSrc,
    pMethod
}
