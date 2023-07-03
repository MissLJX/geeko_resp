<template>
    <div :class="{'product': true, 'valiad': !hasSelect}">
        <div :class="{'selectBox': true, 'hasBorder':!isLast}" v-if="hasSelect">
            <input :id="id" type="checkbox" :value="id" @change="e => selectChange(e)"/>
            <label :for="id"></label>
        </div>
        <div class="itemBox">
            <div class="image">
                <img :src="image" alt="">
            </div>
            <div class="infoBox">
                <div class="mainInfo">
                    <div class="title">{{ name }}</div>
                    <div class="price">{{ price }}</div>
                </div>
                <div class="otherInfo">
                    <div class="sku">
                        {{ 'SKU: ' +  sku }}
                    </div>
                    <div class="skc">
                        {{ skc }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as utils from "../../utils/geekoutil.js";
export default {
    props:{
        product:{
            type: Object,
            default: {}
        },
        hasSelect:{
            type: Boolean,
            default: true
        },
        isLast:{
            type: Boolean,
            default: false
        }
    },
    data(){
        return{

        }
    },
    created() {
        console.log(product)
    },
    computed:{
        id(){
            return this.product?.productId || '-'
        },
        price(){
            return this.product?.price ? utils.unitPrice(this.product.price): '$0.00'
        },
        sku(){
            return this.product?.parentSku
        },
        skc(){
            return (this.product.color ? this.product.color  + ',':'') + this.product.size + ' x ' + this.product.quantity
        },
        image(){
            return this.product?.productImageUrl
        },
        name(){
            return this.product?.productName
        }
    },
    methods:{
        selectChange(e){
            this.$emit("selectChange", e)
        }
    }
}

</script>

<script scoped lang="scss">
.product {
    display: flex;
    align-items: center;
    padding: 10px;

    .selectBox {
        width: 20px;
        margin-right: 10px;
        position: relative;

        input[type="checkbox"] {
            width: 20px;
            height: 20px;
            opacity: 0;
            display: none;
        }

        label {
            position: absolute;
            // left: 20px;
            top: 50px;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 1px solid #999;
            cursor: pointer;
            &:hover{
                opacity: .8;
            }
        }
        input:checked+label {
            background-color: #222;
            border: 1px solid #222;
        }

        input:checked+label::after {
            position: absolute;
            content: "";
            width: 5px;
            height: 10px;
            top: 3px;
            left: 6px;
            border: 2px solid #fff;
            border-top: none;
            border-left: none;
            transform: rotate(45deg)
        }
    }

    .hasBorder {
        &::after{
            content: '';
            display: block;
            height: 1px;
            width: 331px;
            background: #e6e6e6;
            position: absolute;
            bottom: 0;
            left: 22px;
        }
    }

    .itemBox {
        flex: 1;
        display: flex;
        align-items: center;

        .image {
            width: 77px;
            height: 98px;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .infoBox {
            flex: 1;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            justify-content: space-between;

            .mainInfo {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: space-between;

                .title {
                    flex: 1;
                    font-size: 14px;
                    font-family: Roboto-Regular, Roboto;
                    font-weight: 400;
                    color: #222222;
                    line-height: 16px;
                }

                .price {
                    width: 70px;
                    font-size: 14px;
                    font-family: Roboto-Medium, Roboto;
                    font-weight: 500;
                    color: #222222;
                    line-height: 16px;
                }
            }

            .otherInfo {

                .sku {
                    font-size: 14px;
                    font-family: Roboto-Regular, Roboto;
                    font-weight: 400;
                    color: #999999;
                    line-height: 16px;
                    margin-bottom: 10px;
                }

                .skc {
                    font-size: 14px;
                    font-family: Roboto-Regular, Roboto;
                    font-weight: 400;
                    color: #222222;
                    line-height: 16px;
                }
            }
        }
    }

    &.valiad {
        .itemBox {
            .infoBox .mainInfo .title,
            .infoBox .mainInfo .price,
            .otherInfo .sku,
            .otherInfo .skc {
                color: #999;
            }
        }
    }
}
</script>