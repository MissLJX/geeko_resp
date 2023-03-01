<template>
    <div class="index-you-likes">
        <div class="_hd">
            {{$t("recently_viewed")}}
            <!-- {{$t("index.you_may_also_ilke")}} -->
        </div>

        <div class="_bd">
            <recently-view-list
                :products="youlikeProducts"
                :loading="loading"
                :finished="finished"
                @listing="listingHandle"
                :sensors="sensors"
                >
            </recently-view-list>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex"
    import RecentlyViewList from "./recently-view-list.vue"

    export default {
        name:"IndexYouLikes",
        data(){
            return {
                loading: false,
                finished: false,
                sensors:{
                    resourcepage_title: 'me',
                    resource_position: '1',
                    resource_type: '25',
                    resource_content: 'recently view'
                },
                timing: null,
                waitingTargets: []
            }
        },
        computed:{
            ...mapGetters(["youlikeProducts", "youlikeskip"])
        },
        methods:{
            listingHandle(){
                this.loading = true
                const ids = localStorage.getItem("recently_view_products")
                if(ids && JSON.parse(ids)?.data && this.youlikeProducts.length < JSON.parse(ids)?.data.length){
                    //  getYouLikeProducts - getRecentlyViewProducts {skip: this.youlikeskip} - {productIds: JSON.parse(ids)?.data}
                    this.$store.dispatch("getRecentlyViewProducts", {productIds: JSON.parse(ids)?.data?.join(',')}).then(({finished,empty}) => {
                        if(finished) this.finished = finished;
                        this.loading = false
                        // if(!!empty){
                        //     this.$store.dispatch("getYouLikeProductsSkip");
                        // }
                    })
                } else {
                    this.loading = false
                    this.finished = true
                }
            },
        },
        created(){
            this.listingHandle();
        },
        components:{
            "recently-view-list":RecentlyViewList
        }
    }
</script>

<style scoped lang="scss">
    .index-you-likes{
        ._hd{
            font-family: 'AcuminPro-Bold';
            font-size: 18px;
            color: #000000;
            padding: 0px 18px;
            text-transform: capitalize;
        }
    }
</style>