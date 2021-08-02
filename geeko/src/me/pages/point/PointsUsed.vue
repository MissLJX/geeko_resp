<template>
    <div class="points-used">
        <credit-list 
            :credits="pointsUsed"
            :loading="loading"
            @listing="listingHandle"
            :finished="finished" 
        ></credit-list>
    </div>
</template>

<script>
    import CreditList from '../../components/credit-list.vue'
    import store from "../../../store/index.js"

    export default {
        name:"PointsUsed",
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
            pointsUsedSkip(){
                return store.getters["me/pointsUsedSkip"];
            },
            pointsUsed(){
                return store.getters["me/pointsUsed"];
            }
        },
        methods:{
            listingHandle(){
                this.loading = true
                store.dispatch("me/getPointsUsed", this.pointsUsedSkip).then(({finished,empty}) => {
                    if(finished) this.finished = finished;
                    this.loading = false
                    if(!!empty){
                        store.dispatch("me/getPointsUsedSkip");
                    }
                    
                })
            }
        },
        created(){
            if (this.pointsUsed && this.pointsUsed.length <= 0){
                this.listingHandle();
            }
        }
    }
</script>

<style scoped lang="scss">

</style>