import i18n from "../i18n/index.js";

export const getRightSize = arr => {
    return arr.filter(product =>{
        return product.size2 === "S" || product.size2 === "M" || product.size2 === "L" 
                || product.size2 === "XL" || product.size2 === "2XL" || product.size2 === "3XL" 
                || product.size2 === "0XL" || product.size2 === "1XL" || product.size2 === "4XL" || product.size2 === '5XL';
    });
}


export const getShoesSize = arr => {
    return arr.filter(product => {
        return product.size2 === "US4" || product.size2 === "US4.5" || product.size2 === "US5" 
        || product.size2 === "US5.5" || product.size2 === "US6" || product.size2 === "US7"
         || product.size2 === "US8" || product.size2 === "US8.5" || product.size2 === "US9.5"
          || product.size2 === "US10" || product.size2 === "US10.5" || product.size2 === "US11";
    });
}


export const getModelStature = (model,pattern) => {
    if(!model){
        return;
    }
    let arr = [];
    model.forEach(item => {
        let obj = {};

        if(item.height && item.weight){
            let value;
            if(pattern == "cm"){
                value = item.height + "cm/" + item.weight + "kg";
            }else{
                value = item.height + "inch/" + item.weight + "kg";
            }

            obj["height"] = {
                title:i18n.t("model.height_waist"),
                content:value
            }
        }

        if(item.bust && item.waist && item.hip){
            let value = pattern == "cm" ? "(cm)" : "(inch)";
            obj["measure"] = {
                title:i18n.t("model.measure"),
                content:`${item.bust}/${item.waist}/${item.hip}` + value
            }
        }

        if(item.wear){
            obj["mode_wear"] = {
                title:i18n.t("model.model_wear"),
                content:item.wear
            };
        }

        let obj2 = {};
        obj2["name"] = item.name;
        obj2["detail"] = obj;

        arr.push(obj2);
    });
    return arr;
}
