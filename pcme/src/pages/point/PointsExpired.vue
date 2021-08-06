<template>
    <div class="points-recived">
        <points-list 
            :points="pointsExpired" 
            @listing="listingHandle" 
            :loading="loading" 
            :finished="finished"
            :isExpired="true"
        ></points-list>
    </div>
</template>

<script>
    import PointsList from '../../components/point/PointsList.vue';
    import store from '../../store/index.js'

    export default {
        name:"PointsExpired",
        components:{
            "points-list":PointsList
        },  
        data(){
            return {
                loading: false,
                finished: false,
                empty: false,
            }
        },
        computed:{
            pointsExpiredSkip(){
                return store.getters["point/pointsExpiredSkip"];
            },
            pointsExpired(){
                return store.getters["point/pointsExpired"];
            },
        },
        methods:{
            listingHandle(){
                this.loading = true
                store.dispatch("point/getPointsExpired", this.pointsExpiredSkip).then(({finished,empty}) => {
                    if(finished) this.finished = finished;
                    this.loading = false
                    if(!!empty){
                        store.dispatch("point/getPointsExpiredSkip");
                    }
                    
                })
            }
        },
        created(){
            if (this.pointsExpired && this.pointsExpired.length <= 0){
                this.listingHandle();
            }
        }
    }
</script>

<style>

</style>