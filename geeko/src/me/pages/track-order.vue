<template>
    <div class="track-order">
        <page-header>
            <span>Track Order</span>
            <!-- <span slot="oplabel">
                <router-link :to="{ path: '/me/m/order'}">
                    <i class="iconfont contactseller">&#xe716;</i>
                </router-link>
            </span> -->
        </page-header>

        <track-order-list :products="trackOrder" :loading="loading" :finished="finished" @listing="listingHandle"></track-order-list>
    </div>
</template>

<script>
    import PageHeader from '../components/page-header.vue'
    
    import store from '../../store/index.js'
    

    import TrackOrderList from '../components/track-order-list.vue'

    export default {
        name:"TrackOrder",
        data(){
            return {
                loading:false,
                finished:false
            }
        },
        created(){
            if(!(this.trackOrder && this.trackOrder.length > 0)){
                this.listingHandle();
            }
        },
        components:{
            PageHeader,TrackOrderList
        },
        computed:{
            trackOrder(){
                return store.getters["me/trackOrder"];
            },
            trackOrderSkip(){
                return store.getters['me/trackOrderSkip'];
            }
        },
        methods:{
            listingHandle(){
                this.loading = true;
                store.dispatch("me/getTrackOrderMessage",{skip:this.trackOrderSkip}).then(({finished,empty}) => {
                    if(finished) this.finished = finished
                    this.loading = false
                    if(empty) store.dispatch("me/getTrackOrderSkip");
                });
            }
        },
        watch:{
            $route:function(oldValue,newValue){
                console.log("我什么时候被触发呢");
                console.log("oldValue",oldValue);
                console.log("newValue",newValue);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .track-order{
        .contactseller{
            font-size: 30px !important;
            color: #000;
            position: relative;
            top: -8px;
            cursor: pointer;
        }
    }
</style>