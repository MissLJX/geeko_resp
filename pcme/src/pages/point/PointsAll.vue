<template>
    <div class="points-all">
        <points-list :points="pointsAll" @listing="listingHandle" :loading="loading" :finished="finished"></points-list>
    </div>
</template>

<script>
    import PointsList from '../../components/point/PointsList.vue';
    import store from '../../store/index.js'

    import _ from 'lodash'
    // import * as utils from "../../utils/geekoutil.js";

    export default {
        name:"PointsAll",
        components:{
            "points-list":PointsList
        },
        data(){
            return {
                loading: false,
                finished: false,
                empty: false,
                yearArr:[],
                monthArr:[],
            }
        },
        // props:{
        //     selectYear:{
        //         type:String
        //     },
        //     selectedMonth:{
        //         type:String
        //     }
        // },
        computed:{
            pointsAllSkip(){
                return store.getters["point/pointsAllSkip"];
            },
            pointsAll(){
                return store.getters["point/pointsAll"];
            }
            // creditsYear(){
            //     let arr =[];
            //     this.pointsAll.forEach(credit =>{
            //         arr.push(this.getYear(credit.createTime))
            //     })
            //     this.yearArr = _.uniq(arr)
            //     this.selectedYear = this.yearArr[0]
            //     return _.uniq(arr)
            // },
            // creditsMonth(){
            //     let arr =[];
            //     this.pointsAll.forEach(credit =>{
            //         arr.push(this.getMonth(credit.createTime))
            //     })
            //     this.monthArr = _.uniq(arr)
            //     this.selectedMonth = this.monthArr[0]
            //     return _.uniq(arr)
            // },
        },
        methods:{
            listingHandle(){
                this.loading = true
                store.dispatch("point/getPointsAll", this.pointsAllSkip).then(({finished,empty}) => {
                    if(finished) this.finished = finished;
                    this.loading = false
                    if(!!empty){
                        store.dispatch("point/getPointsAllSkip");
                    }
                    
                })
            },
            // getDate(time){
            //     if(time == null){
            //         return ''
            //     }
            //     return utils.enTime(new Date(time))
            // },
            // getYear(time){
            //     if(time == null){
            //         return ''
            //     }
            //     return utils.enYear(new Date(time))
            // },
            // getMonth(time){
            //     if(time == null){
            //         return ''
            //     }
            //     return utils.enMonth(new Date(time))
            // },
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