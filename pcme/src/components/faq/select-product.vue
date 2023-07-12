<template>
    <div :class="{'product': true, 'valiad': !isValiad, 'hasBorder': !isLast}">
        <div :class="{'selectBox': true, 'canNotSelect': isReturned, 'selected1': hasSelected}" v-if="isValiad">
            <!-- <input type="radio" :id="id" :value="id" @change="e => selectChange(e)"> -->
            <label @click="e => selectChange(e)"></label>
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
                        {{ 'SKU: ' + sku }}
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
    import * as utils from '../../utils/geekoutil.js'
    export default{
        props:{
            product:{
                type: Object,
                default: {}
            },
            isValiad:{
                type: Boolean,
                default: true
            },
            isLast:{
                type: Boolean,
                default: false
            },
            isReturned:{
                type: Boolean,
                default: false
            },
            hasSelected:{
                type: Boolean,
                default: false
            }
        },
        data(){
            return {

            }
        },
        created() {
            // console.log(this.product)
        },
        computed:{
            id(){
                return this.product?.productId || '-'
            },
            price(){
                return this.product?.price ?
                    utils.unitPrice(this.product.price):
                    '$0.00'
            },
            sku(){
                return this.product?.sku || '-'
            },
            skc(){
                return (this.product?.color || '')+','+(this.product?.size || '')+' x '+(this.product?.quantity || 1)
            },
            image(){
                return this.product?.imageURL || '-'
            },
            name(){
                return this.product?.name || '-'
            }
        },
        methods:{
            selectChange(e){
                if(!this.isReturned){
                    this.$emit("selectChange", this.product)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.product {
    display: flex;
    align-items: center;
    padding: 10px;
    position: relative;

    .selectBox {
        width: 20px;
        margin-right: 10px;

        label {
            position: absolute;
            // left: 20px;
            top: 65px;
            left: 10px;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 1px solid #999;
            cursor: pointer;
            &:hover{
                opacity: .8;
            }
        }

        &.canNotSelect{
            label{
                background: rgba(34,34,34,0.5);
                cursor: not-allowed;
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
                transform: rotate(45deg)
            }
        }

        &.selected1{
            label{
                background: #222;
                cursor: pointer;
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
                transform: rotate(45deg)
            }
        }
    }

    .hasBorder {
        &::after{
            content: '';
            display: block;
            height: 1px;
            width: 450px;
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
            width: 103px;
            height: 131px;

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
            height: 131px;
            padding: 10px 0px 10px 15px;

            .mainInfo {
                flex: 1;
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                width: 100%;

                .title {
                    flex: 1;
                    font-size: 16px;
                    font-family: Roboto-Regular, Roboto;
                    font-weight: 400;
                    color: #222222;
                    line-height: 18px;
                    text-align: left;
                    display: -webkit-box;
                    text-overflow: ellipsis;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .price {
                    width: 100px;
                    font-size: 16px;
                    font-family: Roboto-Medium, Roboto;
                    font-weight: 500;
                    color: #222222;
                    line-height: 18px;
                }
            }

            .otherInfo {
                text-align: left;
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
</style>