<template>
    <div class="points-recived">
       <credit-list 
            :credits="pointsRecived"
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
        name:"PointsRecived",
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
            pointsRecivedSkip(){
                return store.getters["me/pointsRecivedSkip"];
            },
            pointsRecived(){
                return store.getters["me/pointsRecived"];
            }
        },
        methods:{
            listingHandle(){
                this.loading = true
                store.dispatch("me/getPointsRecived", this.pointsRecivedSkip).then(({finished,empty}) => {
                    if(finished) this.finished = finished;
                    this.loading = false
                    if(!!empty){
                        store.dispatch("me/getPointsRecivedSkip");
                    }
                    
                })
            }
        },
        created(){
            if (this.pointsRecived && this.pointsRecived.length <= 0){
                this.listingHandle();
            }
        }
    }
</script>

<style scoped lang="scss">

</style>