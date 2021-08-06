<template>
    <div class="points-recived">
        <points-list 
            :points="pointsRecived" 
            @listing="listingHandle" 
            :loading="loading" 
            :finished="finished"
        ></points-list>
    </div>
</template>

<script>
    import PointsList from '../../components/point/PointsList.vue';
    import store from '../../store/index.js'

    export default {
        name:"PointsRecived",
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
            pointsRecivedSkip(){
                return store.getters["point/pointsRecivedSkip"];
            },
            pointsRecived(){
                return store.getters["point/pointsRecived"];
            },
        },
        methods:{
            listingHandle(){
                this.loading = true
                store.dispatch("point/getPointsRecived", this.pointsRecivedSkip).then(({finished,empty}) => {
                    if(finished) this.finished = finished;
                    this.loading = false
                    if(!!empty){
                        store.dispatch("point/getPointsRecivedSkip");
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

<style>

</style>