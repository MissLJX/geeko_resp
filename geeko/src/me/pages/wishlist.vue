<template>
    <div class="el-wishlist-body">
        <nav-bar>
            <i class="iconfont el-back-font" slot="left" @click="$router.go(-1)">&#xe693;</i>
            <span slot="center">{{$t('label.wishlist')}}</span>
            <span v-if="ifEdit" slot="right" @click="editHandle" class="iconfont" style="font-size:18px;">&#xe6eb;</span>
            <span v-if="!ifEdit" slot="right" @click="cancelHandle">{{$t('label.cancel')}}</span>
        </nav-bar>

        <div class="fd_message" v-if="fdMessageShow">
            {{$t("label.manage_your_wishlist")}}
        </div>

        <product-list 
            v-if="ifEdit" 
            :products="products" 
            :loading="loading" 
            :finished="finished" 
            @listing="listingHandle"
            event-title="wishlist"
            :request-id="wishlistEvent.requestId"
            :experiment-id="wishlistEvent.experimentId"
         />
        <product-wishlist v-if="!ifEdit" :products="products" :loading="loading" :finished="finished" @listing="listingHandle" @refresh="refreshHandle"/>
        <loading v-if="ifloding"></loading>
    </div>
</template>

<style scoped lang="scss">
    .el-wishlist-body{
        background-color: #fff;
        position: relative;

        ._hd{
            position: relative;
        }

        .fd_message{
            background-color: #ffffff;
            width:75%;
            padding: 15px 10px;
            position: relative;
            -os-box-shadow: 0 0 15px 2px rgba(0,0,0,0.25);
            -ms-box-shadow: 0 0 15px 2px rgba(0,0,0,0.25);
            box-shadow: 0 0 15px 2px rgba(0,0,0,0.25);
            position: absolute;
            right: 5px;
            top: 50px;
            z-index: 3;
            color: #222222;
            font-size: 14px;
            font-family: 'SlatePro-Medium';
            text-align: center;

            &::after{
                content: ' ';
                position: absolute;
                width: 20px;
                height: 20px;
                right: 15px;
                top: -10px;
                background-color: #ffffff;
                transform:rotate(315deg);
                -moz-transform:rotate(315deg); 	/* Firefox */
                -webkit-transform:rotate(315deg); /* Safari 和 Chrome */
                box-shadow: 0px 0px 0px 0 transparent, 0 0px 0px 0px transparent, 0 0 0 0 transparent, 2px -1px 1px -1px rgba(0,0,0,0.25);
            }
        }
    }
</style>

<script type="text/ecmascript-6">
    import NavBar from "../components/nav-bar.vue"
    import ProductList from '../components/wishlist/product-wishlist-list.vue'
    import ProductWishList from '../../components/product-wishlist.vue'
    import store from '../../store'
    import Loading from "../../components/loading.vue";

    export default{
        data(){
            return{
                loading:false,
                finished: false,
                empty: false,
                ifEdit:true,
                ifloding:false,
                fdMessageShow:true
            }
        },
        created:function(){
            setTimeout(() => {
                this.fdMessageShow = false;
            },3000);
        },
        computed: {
            products(){
                return store.getters['me/wishProducts']
            },
            skip(){
                return store.getters['me/wishskip']
            },
            wishlistEvent(){
                return store.getters["me/wishlistEvent"]
            }
        },
        methods: {
            listingHandle(refresh){
                if(refresh){
                    return ''
                }
                this.loading = true
                store.dispatch("me/getWishproducts", {skip: this.skip}).then(({empty, finished}) => {
                    if(finished) this.finished = finished
                    if(empty) this.empty = empty
                    this.loading = false
                    store.dispatch("me/getWishskip")
                })
            },
            refreshHandle({productIds}){
                this.ifloding = true
                if(productIds){
                    store.dispatch('me/removeWishProducts', {productIds}).then(()=>{
                        store.dispatch('clearId').then(()=>{
                            store.dispatch("me/getWishproducts", {skip: this.skip}).then(({empty, finished}) => {
                                this.finished = finished
                                if(empty) this.empty = empty
                                this.ifloding = false
                                store.dispatch("me/getWishskip")
                            })
                        })
                    })
                }else{
                    store.dispatch('me/removeExpiredProducts').then(()=>{
                        store.dispatch('clearId').then(()=>{
                            store.dispatch("me/getWishproducts", {skip: this.skip}).then(({empty, finished}) => {
                                this.finished = finished
                                if(empty) this.empty = empty
                                this.ifloding = false
                                store.dispatch("me/getWishskip")
                            })
                        })
                    })
                }
            },
            editHandle(){
                this.ifEdit = false;
            },
            cancelHandle(){
                this.ifEdit = true;
            }
        },
        components: {
            'loading':Loading,
            'nav-bar': NavBar,
            'product-list': ProductList,
            'product-wishlist':ProductWishList
        },
        beforeRouteEnter(to, from, next){
            var wishproducts = store.getters['me/wishProducts']

            if(wishproducts && wishproducts.length){
                next(vm => {
                    vm.finished = true;
                })
                return;
            }
            store.dispatch("me/getWishproducts", {skip: 0} ).then(({finished}) => {
                store.dispatch("me/getWishskip")
                next(vm => {
                    vm.finished = finished;
                })
            })
        },
        mounted(){

        }
    }
</script>