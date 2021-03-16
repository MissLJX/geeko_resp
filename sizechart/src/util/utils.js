const getRightSize = arr => {
    return arr.filter(product =>{
        return product.size2 === "S" || product.size2 === "M" || product.size2 === "L" 
                || product.size2 === "XL" || product.size2 === "2XL" || product.size2 === "3XL";
    });
}

export default getRightSize;