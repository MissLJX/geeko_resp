import sizeData from '../size.js'
import imgData from '../image.js'
import axios from "../../src/api/apiconfigs";
import _ from 'lodash'
import { getRightSize , getShoesSize } from '../../src/util/utils.js'

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
    let fitStr = {};
    let modelStature = {};

    const pMethods = await getTaglia(productId)
    const productVO = await getProduct(productId)

    fitStr['fitType'] = productVO.product.fitType;
    fitStr['stretch'] = productVO.product.stretch;

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

    // if(pmethod === "size"){
    //     product = getRightSize(product);
    // }else{
    //     product = getShoesSize(product);
    // }
    
    for(let i= 0 ; i <product.length;i++ ){
        const valArr = [];
        const targetItem = sizeData['sizedata'][pmethod].find((n)=>n["value"]===product[i].size2);
        if(targetItem){
            valArr.push(product[i].size);

            labelArr.push(targetItem["label"]);
            sizeArr.push(targetItem["sizeMap"]);
            if(product[i].descriptionMaps){
                const thisArr = [];
                for(let j=0;j<2;j++){
                    thisArr.push(product[i].descriptionMaps[j])
                }
                changeArr.push(...[thisArr])
                result.push([targetItem["label"],targetItem["sizeMap"],...[thisArr]]);
            }else {
                changeArr.push('');
                result.push([targetItem["label"],targetItem["sizeMap"],'']);
            }
        }
    }

    let productModelStature = productVO.product.modelStature;
    if(!!productModelStature 
            && productModelStature != null 
            && productModelStature.modelListOnCm 
            && productModelStature.modelListOnCm.length > 0
            && productModelStature.modelListOnInch 
            && productModelStature.modelListOnInch.length > 0
        ){
        let model = productVO.product.modelStature;
        modelStature["modelListOnCm"] = model.modelListOnCm;
        modelStature["modelListOnInch"] = model.modelListOnInch;
    }

    // console.log("result",result);
    return {
        result,
        imgSrc,
        pMethod,
        fitStr,
        modelStature
    }


}

