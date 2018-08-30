<template>
    <div class="b-relative">
        <div v-if="isAlert">
            <div class="mask"></div>
            <div class="confirm-window">
                <p>Are you sure? <br/>{{tipMsg}}</p>
                <p style="color:#e5004f">
                    <span @click="deleteHandle('0')">{{$t('label.no')}}</span>
                    <span @click="deleteHandle('1')">{{$t('label.yes')}}</span>
                </p>

            </div>
        </div>
        <list :items="products" :loading="loading" :finished="finished" :ifemit="ifemit" class="el-products" @listing="$emit('listing')">
            <template slot="li" scope="props">
                <li :key="props.item.id">
                    <product :product="props.item"/>
                </li>
            </template>
        </list>
        <div class="el-btn">
            <span class="c-clearAll" @click="clearAllHandle()">Remove all Invalid Items</span>
            <span class="c-delete" @click="cancelSaveHandle()">Delete</span>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .Mask{
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.3);
        z-index: 999;
    }
    .el-products{
        li{
            width: 25%;
            padding: 5px;
            float:left;
        }
        margin-bottom: 56px;
        padding: 0 5px;
    }
    .b-relative{
        position: relative;
    }
    .el-btn{
        width: 100%;
        height: 56px;
        border-top: 1px solid #e6e6e6;
        background-color: #fff;
        position: fixed;
        bottom: 0;
        z-index: 500;
        line-height: 56px;
        .c-clearAll{
            width: 210px;
            height: 33px;
            background-color: #222222;
            border-radius: 1px;
            text-align: center;
            color: #fff;
            display: inline-block;
            line-height: 33px;
            margin-left: 10px;
            cursor: pointer;
        }
        .c-delete{
            font-family: HelveticaNeue-Medium;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            color: #000000;
            float: right;
            margin-right: 10px;
            cursor: pointer;
        }
    }
    .mask{
        background: rgba(0,0,0,.2);
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 999;
        position: fixed;
    }
    .confirm-window {
        width: 80%;
        max-width: 400px;
        position:fixed;
        top:50%;
        left:50%;
        transform:translate(-50%, -50%);
        z-index:1000;
        background-color: white;
        padding: 20px;
        p{
            width: 100%;
            &:last-child{
                text-align: right;
                color: #e9546b;
                margin-top: 30px;
                span{
                    margin-right: 20px;
                }
            }
        }
    }
</style>

<script type="text/ecmascript-6">

    import List from './list.vue'
    import ProductWish from './product-wish.vue'
    import store from '../store'

    export default{
        data(){
            return{
                isAlert:false,
                tipMsg:'Are you sure you want to remove these products?',
                clearAll:false,
                ifemit:true
            }
        },
        props: {
            products: {
                type: Array,
                required: true
            },
            loading: {
                type: Boolean,
                default: false
            },
            finished:{
                type: Boolean,
                default: false
            }
        },
        components: {
            'list': List,
            'product': ProductWish
        },
        methods:{
            cancelSaveHandle(){
                this.isAlert = true;
            },
            clearAllHandle(){
                this.tipMsg = 'Are you sure you want to remove all expired products?'
                this.isAlert = true;
                this.clearAll = true;
            },
            deleteHandle(isDel){
                this.isAlert = false;
                if(isDel === '1' && !this.clearAll){
                    let idArr = store.getters['me/save'];
                    let productIds = idArr.join(",");
                    if(productIds){
                        this.$emit('refresh',{productIds});
                        this.$emit('listing','refresh');
                    }
                }else if(isDel === '1' && this.clearAll){
                    this.clearAll = false;
                    this.$emit('refresh',{});
                    this.$emit('listing','refresh')
                }
            },
        }
    }
</script>