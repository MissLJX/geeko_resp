<template>
    <div class="setp2Box">
        <div class="productsSwiper">
            <div class="productsSwiperItem" v-for="(pro, index) in productSelected" :key="index" @click="() => changeProduct(pro)">
                <div :class="{'productBox':true, 'choosed': pro.productId == choosedProduct.productId}">
                    <div class="imageBox">
                        <img :src="pro.imageURL || ''" :alt="pro.productId">
                    </div>
                </div>
                <div :class="{'selectBox': true, 'selected': pro.reason? true: false}">
                    <label></label>
                </div>
            </div>
        </div>
        <div class="reasonListBox">
            <div class="reasonItem" v-for="(rea, index1) in reasonList" :key="index1" @click="e => reasonChange(rea)">
                <div class="reasonTitle">{{ rea.label || '-' }}</div>
                <div class="reasonSelectBox">
                    <!-- <input type="radio" name="reason" :checked="productReasonCode == rea.value" :id="rea.value"> -->
                    <label :class="{'labelSelected': productReasonCode == rea.value}"></label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        productSelected:{
            type: Array,
            default: ''
        },
        reasonList:{
            type: Array,
            default: []
        }
    },
    data(){
        return {
            choosedProduct: {productId:0},
            choosedValue: null,
        }
    },
    mounted(){
        if(this.productSelected?.length > 0){
            this.choosedProduct = this.productSelected[0]
        }
    },
    computed:{
        productReasonCode(){
            console.log(this.choosedProduct?.reasonCode)
            return this.choosedValue || this.choosedProduct?.reasonCode || ''
        }
    },
    methods:{
        changeProduct(pro){
            this.choosedProduct = pro
            this.choosedValue = null
        },
        reasonChange(reason){
            if(this.choosedProduct?.reasonCode == reason?.value){
                this.choosedValue = null
                this.$emit("changeProductReason", {product:this.choosedProduct, reason: null, reasonCode: null})
            } else {
                this.choosedValue = reason?.value
                console.log(this.choosedProduct)
                this.$emit("changeProductReason", {product:this.choosedProduct, reason, reasonCode: reason?.value})
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.setp2Box{
    height: calc(100% - 121px);
    overflow: auto;
    width: 100%;
    overflow-x: hidden;
    // padding-bottom: 100px;
    /*定义整体的宽度*/
    &::-webkit-scrollbar {
        width: 1px;
        height: 3px;
    }
    /*定义滚动条轨道*/
    &::-webkit-scrollbar-track {
        border-radius: 2px;
    }
    /*定义滑块*/
    &::-webkit-scrollbar-thumb {
        width: 1px;
        height: 1px;
        border-radius: 3px;
        background-color: #cccccc;
    }
    &::-webkit-scrollbar-thumb:hover{
        background-color: #999; 
    }

    .productsSwiper{
        // height: 116px;
        padding: 10px;
        overflow-y: hidden;
        overflow-x: scroll;
        white-space: nowrap;
        text-align: left;

       /*定义整体的宽度*/
       &::-webkit-scrollbar {
            width: 1px;
            height: 3px;
        }
        /*定义滚动条轨道*/
        &::-webkit-scrollbar-track {
            border-radius: 2px;
        }
        /*定义滑块*/
        &::-webkit-scrollbar-thumb {
            width: 1px;
            height: 1px;
            border-radius: 3px;
            background-color: #cccccc;
        }
        &::-webkit-scrollbar-thumb:hover{
            background-color: #999; 
        }

        .productsSwiperItem{
            display: inline-block;
            margin-right: 10px;
            cursor: pointer;
            width: 60px;
            // height: 96px;

            .productBox{
                width: 100%;
                // height: 96px;
                margin-bottom: 5px;

                &.choosed{
                    outline: 1px solid #222;
                }

                .imageBox{
                    width: 100%;
                    height: 100%;
                    padding: 3px 2px 0;

                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
            }

            .selectBox{
                label {
                    display: block;
                    margin: 0 auto;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    border: 1px solid #999;
                    
                    &:hover{
                        opacity: .8;
                    }
                }

                &.selected{
                    label{
                        background: #222;
                        border: 1px solid #222;
                        cursor: pointer;
                        position: relative;
                    }
                    label::after {
                        position: absolute;
                        content: "";
                        width: 5px;
                        height: 10px;
                        top: 3px;
                        left: 6px;
                        border: 2px solid #fff;
                        border-top: none;
                        border-left: none;
                        transform: rotate(45deg);
                    }
                }
            }
        }
    }

    .reasonListBox{
        width: 480px;
        background: #F9F9F9;
        border-radius: 10px 10px 0px 0px;
        margin-left: 10px;
        margin-top: 12px;
        height: calc(100% - 20px);
        overflow: auto;

        .reasonItem{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px;
            font-size: 14px;
            font-family: Roboto-Regular, Roboto;
            font-weight: 400;
            color: #222222;
            line-height: 16px;
            position: relative;

            .reasonSelectBox{
                width: 16px;
                height: 16px;

                input{
                    width: 16px;
                    height: 16px;
                    opacity: 0;
                    display: none;
                }

                label {
                    position: absolute;
                    top: 12px;
                    right: 12px;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    border: 1px solid #222;
                    cursor: pointer;
                    &:hover{
                        opacity: .8;
                    }
                }

                .labelSelected::after {
                    position: absolute;
                    content: "";
                    display: inline-block;
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    top: 2px;
                    left: 2px;
                    background: #222;
                    transform: rotate(45deg)
                }
            }
        }
    }
}
</style>