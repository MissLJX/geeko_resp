<template>
    <div>
        <div class="maskBox1" @click.self="close">
            <div class="maskMainBox">
                <div class="maskMainHead">
                    <span class="title">Please select the item(s)</span>
                    <span class="iconfont close" @click="close">&#xe69a;</span>
                </div>

                <div class="productsBox">
                    <div class="product" v-for="(product, index) in products" :key="index">
                        <select-product
                            :isLast="index == products.length - 1"
                            :product="product"
                            :hasSelect="hasSelect"
                            />
                    </div>

                    <div class="valiadTips" v-if="showValid">
                        <span>This kind of item cannot be returned</span>
                        <span class="ask" @click="showConfirm">?</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SelectProduct from './select-product.vue'
export default {
    data(){
        let p1 = [{
            "selected": false,
            "productId": "2db4a536-0e30-4d4a-af25-2b3e698534dd",
            "variantId": "126Y4C8z6I1g0f1r6B7c564A5V",
            "quantity": 1,
            "price": {
                "amount": "13.74",
                "unit": "$",
                "currency": "USD"
            },
            "productName": "dfghgjhfgdfsfdb",
            "size": "M(8)",
            "parentSku": "LZ033001-amourChic-pi",
            "sku": "LZ033001-pi-M-amourChic",
            "productImageUrl": "https://dgzfssf1la12s.cloudfront.net/medium/2db4a536-0e30-4d4a-af25-2b3e698534dd-17531-pc",
            "color": "pink",
            "status": 0,
            "usdPrice": {
                "amount": "66.66",
                "unit": "$",
                "currency": "USD"
            },
            "isDomesticDelivery": false
        },
        {
            "selected": false,
            "productId": "2db4a536-0e30-4d4a-af25-2b3e698534dd",
            "variantId": "126Y4C8z6I1g0f1r6B7c564A5V",
            "quantity": 1,
            "price": {
                "amount": "77.77",
                "unit": "$",
                "currency": "USD"
            },
            "productName": "dfghgjhfgdfsfdb",
            "size": "M(8)",
            "parentSku": "LZ033001-amourChic-pi",
            "sku": "LZ033001-pi-M-amourChic",
            "productImageUrl": "https://dgzfssf1la12s.cloudfront.net/medium/2db4a536-0e30-4d4a-af25-2b3e698534dd-17531-pc",
            "color": "pink",
            "status": 0,
            "usdPrice": {
                "amount": "13.74",
                "unit": "$",
                "currency": "USD"
            },
            "isDomesticDelivery": false
        }]
        return{
            test: 1,
            products: p1,
            showValid: true,
            hasSelect: true
        }
    },
    methods:{
        close(){
            console.log('111')
            this.$emit("returnSelectClose")
        },
        showConfirm(){
            console.log('showConfirm')
        }   
    },
    components:{
        "select-product": SelectProduct,
    }
}
</script>


<style scoped lang="scss">

.maskBox1 {
    background: rgba(34, 34, 34, 0.3);
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1;
    width: 499px;
    height: 100%;
    cursor: pointer;

    .maskMainBox {
        width: 100%;
        height: 700px;
        position: absolute;
        bottom: 0;
        left: 0;
        border-radius: 10px 10px 0 0;
        background: #fff;

        .maskMainHead {
            height: 40px;
            line-height: 40px;
            text-align: center;
            position: relative;

            .title {
                font-size: 14px;
                font-family: Roboto-Medium, Roboto;
                font-weight: 500;
                color: #222222;
                line-height: 16px;
            }

            .close {
                position: absolute;
                right: 12px;
                top: 12px;
                color: #666;
                font-size: 12px;
                line-height: 12px;
                // transform: scale(0.67);
                cursor: pointer;
            }
        }

        .productsBox {
            height: 580px;
            overflow: auto;
            width: 100%;

            &::-webkit-scrollbar{
                display: none;
            }

            .valiadTips {
                width: 100%;
                background: #F6F6F6;
                padding: 7px 12px;
                font-size: 14px;
                font-family: Roboto-Medium, Roboto;
                font-weight: 500;
                color: #222222;
                line-height: 16px;
                text-align: left;

                .ask {
                    display: inline-block;
                    width: 14px;
                    height: 14px;
                    color: #999999;
                    border: 1px solid #999;
                    font-size: 12px;
                    line-height: 14px;
                    text-align: center;
                    background: #fff;
                    margin-left: 3px;
                    border-radius: 50%;
                    cursor: pointer;
                }
            }
        }

        .buttonBox {
            width: 100%;
            height: 81px;
            background: #FFFFFF;
            box-shadow: 0px 1px 8px 0px rgba(0,0,0,0.5);
            padding: 14px 12px 23px;

            button {
                width: 100%;
                height: 44px;
                background: #222222;
                text-align: center;
                line-height: 44px;
                color: #fff;
                text-transform: uppercase;
                cursor: pointer;
                outline: none;
                border: none;
            }
        }
    }
}
</style>