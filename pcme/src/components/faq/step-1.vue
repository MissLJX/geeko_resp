<template>
    <div style="height: 100%;">
        <div class="productsBox">
            <div class="product" v-for="(product, index) in productCanSelect" :key="'products'+index">
                <select-product
                    :isLast="isLast(index, productCanSelect.length - 1)"
                    :product="product"
                    :hasSelected="product.selected"
                    :isValiad="true"
                    @selectChange="product => selectChange(product)"
                    />
            </div>

            <div class="valiadTips" v-if="productReturned.length > 0">
                <span>{{ $t('items_are_returned') }}</span>
                <span class="view" @click="toView">{{ $t('view')+ ' >' }}</span>
            </div>

            <div class="product" v-for="(product1, index1) in productReturned" :key="'productRetrun'+index1">
                <select-product
                    :isLast="isLast(index1, productReturned.length - 1)"
                    :product="product1"
                    :isValiad="true"
                    :isReturned="true"
                    />
            </div>

            <div class="valiadTips" v-if="productCannotSelect.length > 0">
                <span>{{ $t('items_cannot_returned') }}</span>
                <span class="ask" @click="showConfirm">?</span>
            </div>

            <div class="product" v-for="(product, index2) in productCannotSelect" :key="'valiadProducts'+index2">
                <select-product
                    :isLast="isLast(index2, productCannotSelect.length - 1)"
                    :product="product"
                    :isValiad="false"
                    />
            </div>
        </div>

        
    </div>
</template>

<script>
import SelectProduct from './select-product.vue'
export default {
    props:{
        productCanSelect:{
            type: Array,
            default: []
        },
        productReturned:{
            type: Array,
            default: []
        },
        productCannotSelect:{
            type: Array,
            default: []
        },
    },
    data(){
        return {

        }
    },
    created(){
       
    },
    methods:{
        selectChange(product){
            this.$emit("selectChange", product)
        },
        toView(){
            const hasReturnOrderIdNum = this.productReturned?.filter( p => p?.returnOrderId)?.length || 0
            if(this.productReturned?.length == 1){
                const returnId = this.productReturned?.[0]?.returnOrderId
                this.$emit('toView', {id: returnId, to: 'detail'})
            } else if(hasReturnOrderIdNum > 1){
                this.$emit('toView', {id: returnId, to: 'list'})
            } else {
                this.$emit("toView", {id: '', to: 'detail'})
            }
        },
        showConfirm(){
            this.$emit("showConfirm")
        },
        isLast(num1, num2){
            return num1 == num2
        },
    },
    components:{
        "select-product": SelectProduct,
    }
}
</script>

<style lang="scss" scoped>
.productsBox {
    height: calc(100% - 121px);
    overflow: auto;
    width: 100%;
    padding-bottom: 100px;

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
        margin-top: 10px;
        margin-bottom: 10px;
        position: relative;

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

        .view{
            display: inline-block;
            width: 100%;
            position: absolute;
            right: 10px;
            top: 6px;
            text-align: right;
            width: 100px;
            line-height: 16px;
            text-transform: capitalize;
        }
    }
}


</style>