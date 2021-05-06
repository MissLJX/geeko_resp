export const getRightSize = arr => {
    return arr.filter(product =>{
        return product.size2 === "S" || product.size2 === "M" || product.size2 === "L" 
                || product.size2 === "XL" || product.size2 === "2XL" || product.size2 === "3XL";
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
