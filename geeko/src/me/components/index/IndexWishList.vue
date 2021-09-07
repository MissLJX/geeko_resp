<template>
    <div class="index-wishlist">
        <product-list 
            :products="products" 
            :loading="loading" 
            :finished="finished" 
            :scrollable="scrollable" 
            @listing="listingHandle" 
            v-if="isLogin"
            calssify-name="wishlist"
        />

        <div class="_bd" v-if="goShoppingShow || !isLogin">
            <div class="_icon">
                <span class="iconfont">&#xe6e7;</span>
            </div>

            <p class="_font">Add your favorites to your Wishlist now!</p>

            <div class="_btn">
                <span v-if="goShoppingShow" @click="selectGo('/')">Go Shopping</span>
                <span v-if="!isLogin" @click="selectGo('/i/login?redirectUrl=/me/m')">Sign In</span>
            </div>
            <!-- <div class="_btn">Go Shopping</div> -->
        </div>
    </div>
</template>

<script>
    import ProductList from '../../components/wishlist/product-wishlist-list.vue'
    import store from '../../../store/index.js'
    import { mapGetters } from "vuex"

    export default {
        name:"IndexWishList",
        data(){
            return{
                loading:false,
                finished: false,
                empty: false,
                scrollable:true,
                goShoppingShow:false
            }
        },
        computed: {
            ...mapGetters('me',["isLogin"]),
            products(){
                return store.getters['me/wishProducts']
            },
            skip(){
                return store.getters['me/wishskip']
            }
        },
        methods: {
            listingHandle(){
                this.loading = true
                store.dispatch("me/getWishproducts", {skip: this.skip}).then(({empty, finished}) => {
                    console.log("finished",finished);
                    if(finished) this.finished = finished
                    if(empty) this.empty = empty
                    this.loading = false;
                    this.scrollable = true;
                    store.dispatch("me/getWishskip")
                })
            },
            selectGo(href){
                window.location.href = href;
            }
        },
        components: {
            'product-list': ProductList
        },
        created(){
            if(!this.isLogin || (this.products && this.products.length > 0)){
                return;
            }
            if(this.goShoppingShow){
                return;
            }

            this.loading = true;
            store.dispatch("me/getWishproducts", {skip: 0}).then(({empty, finished}) => {
                this.loading = false
                store.dispatch("me/getWishskip")
                if(finished){
                    this.goShoppingShow = true;
                    this.finished = finished;
                }else{
                    this.goShoppingShow = false;
                }
            })
        }
    }
</script>

<style scoped lang="scss">
    .index-wishlist{
        ._bd{
            padding-bottom: 70px;
           ._icon{
               text-align: center;
                margin-top: 30px;

               .iconfont{
                   font-size: 70px;
               }
           }

           ._font{
                font-size: 12px;
                color: #999999;
                text-align: center;
                margin-top: 20px;
           }

           ._btn{
                border-radius: 2px;
                
                font-size: 16px;
                color: #222222;
                text-align: center;
                margin-top: 10px;
                margin-bottom: 60px;

                & span{
                    border: solid 1px #979797;
                    padding: 8px 15px;
                    display: inline-block;
                }
           }
        }
    }
</style>