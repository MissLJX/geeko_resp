<template>
   <div class="points-expired">
        <credit-list 
            :credits="pointsExpired"
            :loading="loading"
            @listing="listingHandle"
            :finished="finished"
            :isExpired="true"
        ></credit-list>
   </div>
</template>

<script>
    import CreditList from '../../components/credit-list.vue'
    import store from "../../../store/index.js"

    export default {
        name:"PointsExpired",
        data(){
            return {
                loading: false,
                finished: false,
                empty: false,
            }
        },
        components:{
            'credit-list':CreditList
        },
        computed:{
            pointsExpiredSkip(){
                return store.getters["me/pointsExpiredSkip"];
            },
            pointsExpired(){
                return store.getters["me/pointsExpired"];
            }
        },
        methods:{
            listingHandle(){
                this.loading = true
                store.dispatch("me/getPointsExpired", this.pointsExpiredSkip).then(({finished,empty}) => {
                    if(finished) this.finished = finished;
                    this.loading = false
                    if(!!empty){
                        store.dispatch("me/getPointsExpiredSkip");
                    }
                    
                })
            }
        },
        created(){
            if (this.pointsExpired && this.pointsExpired.length <= 0)
                this.listingHandle()
        }
    }
</script>

<style scoped lang="scss">

</style>