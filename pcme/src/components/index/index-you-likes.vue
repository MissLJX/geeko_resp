<template>
    <div class="index-you-likes">
        <div class="_hd">
            {{$t("index.you_may_also_ilke")}}
        </div>

        <div class="_bd">
            <you-likes-list :products="youlikeProducts" :loading="loading" :finished="finished" @listing="listingHandle"></you-likes-list>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex"
    import YouLikesList from "./you-likes-list.vue"

    export default {
        name:"IndexYouLikes",
        data(){
            return {
                loading: false,
                finished: false,
            }
        },
        computed:{
            ...mapGetters(["youlikeProducts","youlikeskip"])
        },
        methods:{
            listingHandle(){
                this.loading = true
                this.$store.dispatch("getYouLikeProducts", {skip:this.youlikeskip}).then(({finished,empty}) => {
                    if(finished) this.finished = finished;
                    this.loading = false
                    if(!!empty){
                        this.$store.dispatch("getYouLikeProductsSkip");
                    }
                    
                })
            },
        },
        created(){
            this.listingHandle();
        },
        components:{
            "you-likes-list":YouLikesList
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
        }
    }
</style>