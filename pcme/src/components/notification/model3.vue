<!--纯文字-->
<template>
    <a :href="url">
        <div class="n-mode">
            <div v-if="model.content" class="mgr-5">
                {{model.content}}
            </div>
            <p class="i-sendtime" v-if="sendtime">{{sendtime}}</p>
        </div>
    </a>
</template>

<style scoped lang="scss">
    .n-mode{
        width: 452px;
        background-color: #ffffff;
        border: solid 1px #e6e6e6;
        display: flex;
        justify-content: space-between;
        color: #222;
        overflow: hidden;
        padding: 25px 12px;
        align-items: center;
        img{
            width: 60px;
            height: 60px;
            margin-right: 8px;
        }
    }
    .mgr-5{
        margin-right: 5px;
    }

    .i-sendtime{
        color:#999;
        font-size: 12px;
    }

</style>

<script type="text/ecmascript-6">
    export default{
        computed: {
            url(){
                var deepLink = this.model.deepLink, _url
                switch (deepLink.type) {
                    case 1:
                        _url = '/i/collection/products?collectionId=' + deepLink.params[0]
                        break
                    case 2:
                        _url = '/i/product_detail?productId=' + deepLink.params[0]
                        break
                    case 3:
                        _url = '/me/m/coupons'
                        break
                    case 7:
                        _url = '/me/m/credits'
                        break
                    case 8:
                        _url = '/me/m/order/detail/' + deepLink.params[0]
                        break
                    case 9:
                        _url = '/me/m/tickets'
                        break
                    case 10:
                        _url = '/i/lottery'
                        break
                    case 11:
                        _url = '/i/early-bird'
                        break
                    case 12:
                        _url = '/i/flash/products'
                        break
                    case 13:
                        _url = '/i/new-arrivals'
                        break
                    case 14:
                        _url = '/i/trending-now'
                        break
                    case 15:
                        _url = '/i/category/products?categoryId=' + deepLink.params[0]
                        break
                    case 16:
                        _url = deepLink.params[0]
                        break
                    case 17:
                        _url = '/shoppingcart/show'
                        break
                    default:
                        _url = '#'
                }
                return _url
            }
        },
        methods:{
            imgurl(imgage){
                if(imgage){
                    return "https://dgzfssf1la12s.cloudfront.net"+imgage
                }
            }
        },
        props: {
            model: {
                type: Object,
                required: true
            },
            sendtime:{
                type:String,
                required: true
            }
        }
    }
</script>