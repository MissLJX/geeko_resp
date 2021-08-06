<template>
    <div>
        <points-list 
            :points="pointsUsed" 
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
        name:"PointsUsed",
        data(){
            return {
                loading: false,
                finished: false,
                empty: false,
            }
        },
        components:{
            'points-list':PointsList
        },
        computed:{
            pointsUsedSkip(){
                return store.getters["point/pointsUsedSkip"];
            },
            pointsUsed(){
                return store.getters["point/pointsUsed"];
            },
        },
        methods:{
            listingHandle(){
                this.loading = true
                store.dispatch("point/getPointsUsed", this.pointsUsedSkip).then(({finished,empty}) => {
                    if(finished) this.finished = finished;
                    this.loading = false
                    if(!!empty){
                        store.dispatch("point/getPointsUsedSkip");
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

<style>

</style>