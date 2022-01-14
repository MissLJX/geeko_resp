<template>
    <div class="order_list_box">
        <div class="order_list_item" v-for="item in reviewOrderList">
            <div class="order_title">
                <span>Order No. <span class="order_id">{{item.id}}</span></span>
            </div>
            <div class="order_info">
                <ul class="order_img">
                    <li v-for="(item1,index1) in item.orderItems" v-if="index1<5">
                        <img :src="item1.productImageUrl" alt="">
                    </li>
                    <span v-if="item.orderItems.length > 5" class="iconfont img_more_icon">&#xe74d;</span>
                </ul>
                <div class="to_review">
                    <span @click="()=>toReview(item.id)">{{$t("points_mall.to_review")}}</span>
                </div>
            </div>
        </div>
        <div class="view_more" @click="viewMore">
            {{$t("points_mall.view_more")}}
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
    props:{
        orderList:{
            type: Array,
            default: []
        },

    },
    data(){
        return{

        }
    },
    computed:{
        // ...mapGetters(["reviewOrderList","loadAll","all"]),
    },
    methods:{
        toReview(id){
            this.$router.push("/me/m/order-review?orderid="+id)
        },
        viewMore(){
            this.$router.push({path:"/me/m/order?type=review", params:{type: 'review'}})
        },
        // getReviewOrder(){
        //     this.$store.dispatch("getReviewOrder").then(res => {
        //         console.log(res)
        //     })
        // },
    },
    created(){
        // this.getReviewOrder()
        // this.$store.dispatch('loadAll',10).then((res)=> {
        //     console.log(res)
        // })
    }
}
</script>

<style scoped>
    .order_list_box{
        width: 100%;
        padding: 0 20px;
    }
    .order_list_item{
        height: 210px;
	    border: solid 1px #e6e6e6;
        margin-bottom: 20px;
    }
    .order_title{
        height: 40px;
	    background-color: #f7f7f7;
        font-family: SLATEPRO;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #666666;
        line-height: 40px;
        padding-left: 10px;
    }
    .order_id{
        color: #222;
    }
    .order_info{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .order_img{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 10px;
        flex: 1;
        overflow: hidden;
    }
    .order_img li {
        margin-right: 20px;
    }
    .order_img img{
        height: 150px;
    }
    .img_more_icon{
        color: #999999;
        transform: scale(0.3);
    }
    .to_review{
        padding: 0 50px;
        height: 170px;
        border-left: 1px solid #eee;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .to_review > span{
        display: block;
        height: 44px;
        line-height: 44px;
        text-align: center;
        background-color: #222222;
        border-radius: 2px;
        font-family: 'ACUMINPRO-BOLD';
        font-size: 20px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
        padding: 0 70px;
        cursor: pointer;
        text-transform: uppercase;
    }
    .view_more{
        width: 200px;
        height: 42px;
        background-color: #222222;
        border-radius: 21px;
        font-family: 'SLATEPRO';
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
        text-align: center;
        line-height: 42px;
        margin: 0 auto;
        margin-top: 30px;
        text-transform: uppercase;
        cursor: pointer;
    }
</style>