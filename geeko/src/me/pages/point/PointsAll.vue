<template>
    <div class="points-all">
        <credit-list 
            :credits="pointsAll"
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
        name:"PointsAll",
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
            pointsAllSkip(){
                return store.getters["me/pointsAllSkip"];
            },
            pointsAll(){
                return store.getters["me/pointsAll"];
            }
        },
        methods:{
            listingHandle(){
                this.loading = true
                store.dispatch("me/getPointsAll", this.pointsAllSkip).then(({finished,empty}) => {
                    if(finished) this.finished = finished;
                    this.loading = false
                    if(!!empty){
                        store.dispatch("me/getPointsAllSkip");
                    }
                    
                })
            }
        },
        created(){
            if (this.pointsAll && this.pointsAll.length <= 0){
                this.listingHandle();
            }
        }
    }
</script>

<style scoped lang="scss">

</style>