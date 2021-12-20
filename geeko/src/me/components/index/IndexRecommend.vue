<template>
    <div class="index-recommend">
        <div class="_hd">
            <div :class="{'active' : componentName == 'index-wishlist'}">
                <span @click="componentName = 'index-wishlist'">{{$t("index.wishlist")}}</span>
            </div>
            <div :class="{'active' : componentName == 'you-likes'}">
                <span @click="componentName = 'you-likes'">{{$t("label.mayLike")}}</span>
            </div>
        </div>

        <div class="_bd">
            <keep-alive>
                <component :is="componentName"></component>
            </keep-alive>
        </div>
    </div>
</template>

<script>
    import YouLikes from "../../../components/you-likes.vue"
    import IndexWishList from "./IndexWishList.vue"

    export default {
        name:"IndexRecommend",
        components:{
            "you-likes":YouLikes,
            "index-wishlist":IndexWishList
        },
        data(){
            return {
                componentName:"index-wishlist"
            }
        }
    }
</script>

<style scoped lang="scss">
    .index-recommend{
        padding: 0px 12px;
        ._hd{
            display: flex;
            padding: 15px 0px;

            & > div{
                width: 50%;
                text-align: center;
                & span{
                    font-size: 14px;
                    color: #666666;
                }

                &.active{
                    color: red;

                    & span{
                        color: #000000;
                        font-family: 'SlatePro-Medium';
                        border-bottom: 2px solid #222222;
                    }
                }
            }
        }
    }
</style>