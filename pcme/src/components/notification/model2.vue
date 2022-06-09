<!--大图+content-->
<template>
    <a :href="url" @click="(e) => geekoSensor(e)">
        <div class="b-border">
            <div class="n-mode">
                <div v-if="model.content" class="mgr-5">
                    {{model.content}}
                </div>
                <p class="i-sendtime" v-if="sendtime">{{sendtime}}</p>
            </div>
            <img  v-if="model.image" :src="imgurl(model.image)">
        </div>
    </a>
</template>

<style scoped lang="scss">
    .b-border{
        width: 452px;
        border: solid 1px #e6e6e6;
        padding: 25px 12px;
        img{
            width: 410px;
            margin-top: 15px;
        }
    }
    .n-mode{
        width: 100%;
        background-color: #ffffff;
        display: flex;
        justify-content: space-between;
        color: #222;
        overflow: hidden;
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
                var id =  deepLink.params[1] ? deepLink.params[1] : ''
                switch (deepLink.type) {
                    case 1:
                        // _url = '/i/collection/products?collectionId=' + deepLink.params[0]
                        _url = `/collection/products/${deepLink.params[0]}.html`
                        break
                    case 2:
                        // _url = '/i/product_detail?productId=' + deepLink.params[0]
                        _url = `/product/details/${deepLink.params[0]}.html`
                        break
                    case 3:
                        _url = '/me/m/coupons'
                        break
                    case 7:
                        _url = '/me/m/credits'
                        break
                    case 8:
                        _url = '/me/m/order'
                        break
                    case 9:
                        if(deepLink.params[0]){
                            _url = '/me/m/faq/support-ticket/'+deepLink.params[0]
                        } else {
                            _url = '/me/m/faq/support-ticket'
                        }
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
                        // _url = '/i/category/products?categoryId=' + deepLink.params[0]
                        _url = `/category/products/${deepLink.params[0]}.html`
                        break
                    case 16:
                        _url = deepLink.params[0]
                        break
                    case 17:
                        _url = '/shoppingcart/show'
                        break
                    case 22:
                        _url = '/me/m/order/detail/' + deepLink.params[0]
                        break
                    case 36:
                        _url = '/me/m/vip'
                        break
                    default:
                        _url = '#'
                }
                return _url
            },
            utmTerm(){
                if(this.model.deepLink && this.model.deepLink.utmTerm){
                    return this.model.deepLink.utmTerm
                }
                return 'utmTerm 未返回'
            },
        },
        methods:{
            imgurl(imgage){
                if(imgage){
                    return "https://image.geeko.ltd"+imgage
                }
            },
            geekoSensor(e){
                this.$emit("record", this.utmTerm)
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