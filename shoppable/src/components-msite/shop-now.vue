<template>
    <div class="product-shop-now">
        <div class="price-block">
            <div class="product-total-price">
                <span>TotalPrice:</span><strong>{{this.pprice.unit}}{{totalPrice | price}}</strong>
            </div>
            <div class="product-save-price">
                <span>Save:$5.49</span>
            </div>
        </div>
        <div class="shop-btn">
            <span>SHOP NOW</span>
        </div>
        <div style="clear: both"></div>
    </div>
</template>

<script>
    import * as api from '../api/shoppable'
    export default {
        name: "ShopNow",
        props:['msg'],
        computed:{
            totalPrice:function(){
                return Number(this.pprice.amount)+Number(this.p1price.amount)+Number(this.p2price.amount)
            }
        },
        created(){
            this.pprice = this.getRealPrice(this.msg.product);
            this.p1price = this.getRealPrice(this.msg.products[0]);
            this.p2price = this.getRealPrice(this.msg.products[1]);
        },
        methods:{
            getRealPrice(p) {
                if (p.promotion && p.promotion.enabled) {
                    return p.promotion.promotionPrice;
                }
                return p.price;
            },
        },
        filters:{
            price: function (val) {
                val = val.toString().replace(/\$|\,/g,'');
                if(isNaN(val)) {
                    val = "0";
                }
                let sign = (val == (val = Math.abs(val)));
                val = Math.floor(val*100+0.50000000001);
                let cents = val%100;
                val = Math.floor(val/100).toString();
                if(cents<10) {
                    cents = "0" + cents
                }
                for (var i = 0; i < Math.floor((val.length-(1+i))/3); i++) {
                    val = val.substring(0,val.length-(4*i+3))+',' + val.substring(val.length-(4*i+3));
                }

                return (((sign)?'':'-') + val + '.' + cents);
            }
        }
    }
</script>

<style lang="scss" scoped>
.product-shop-now{
    width: 90%;
    margin-left: 32px;
    margin-bottom: 35px;
    .price-block{
        float: left;
        .product-total-price{
            span{
                font-size: 26px;
                color: #000;
            }
            strong{
                font-size: 22px;
                color: #f5b2a2;
            }
        }
        .product-save-price{
            padding-top: 16px;
            span{
                font-size: 22px;
                color: #666666;
            }
        }
    }
    .shop-btn{
        float: right;
        width: 212px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
        margin-top: 24px;
        background-color:#f5b2a2;
        span{
            font-size: 16px;
            color: white;
        }
    }
    .price-block::after{
        content: '';
        display: block;
        clear: both;
    }
}
</style>