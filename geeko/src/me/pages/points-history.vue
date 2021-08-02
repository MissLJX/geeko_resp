<template>
    <div class="points-history">
        <nav-bar>
            <i class="iconfont el-back-font" slot="left" @click="$router.go(-1)">&#xe693;</i>
            <span slot="center">Points History</span>
        </nav-bar>
        <div class="_hd">
            <!-- <p v-for="(nav,index) in navs" :key="index+nav.path">
                <router-link :to="{name:nav.path}" replace>
                    <span :class="{'active':nav.active}">{{nav.name}}</span>
                </router-link>
            </p> -->
            <!-- <p @click="changeMethod('0')">
                <span :class="{'active' : this.isReceived == '0'}"></span>
            </p>
            <p @click="changeMethod('1')">
                <span :class="{'active' : this.isReceived == '1'}"></span>
            </p>
            <p @click="changeMethod('2')">
                <span :class="{'active' : this.isReceived == '2'}"></span>
            </p>
            <p @click="changeMethod('3')">
                <span :class="{'active' : this.isReceived == '3'}"></span>
            </p> -->
            <!-- {id: '1', name: 'All', path: 'points-all', active: 'points-all' == this.$route.name || 'all' == this.$route.path},
            {id: '2', name: "Recived", path: 'points-recived', active: 'points-recived' == this.$route.name},
            {id: '3', name: "Used", path: 'points-used', active: 'points-used' == this.$route.name},
            {id: '4', name: "Expired", path: 'points-expired', active: 'points-expired' == this.$route.name} -->

            <p>
                <router-link :to="{name:'points-all'}" replace>
                     <span :class="{'active' : 'points-all' == this.$route.name || 'points-all2' == this.$route.name}">All</span>
                </router-link>
            </p>
            <p>
                <router-link :to="{name:'points-recived'}" replace>
                     <span :class="{'active' : 'points-recived' == this.$route.name}">Recived</span>
                </router-link>
            </p>
            <p>
                <router-link :to="{name:'points-used'}" replace>
                     <span :class="{'active' : 'points-used' == this.$route.name}">Used</span>
                </router-link>
            </p>
            <p>
                <router-link :to="{name:'points-expired'}" replace>
                     <span :class="{'active' : 'points-expired' == this.$route.name}">Expired</span>
                </router-link>
            </p>


            <!-- <p>
                <router-link :to="{name:nav.path}" replace>
                     <span :class="{'active' : this.isReceived == '0'}"></span>
                </router-link>
            </p>
            <p>
                <router-link :to="{name:nav.path}" replace>
                     <span :class="{'active' : this.isReceived == '0'}"></span>
                </router-link>
            </p> -->
        </div>

        <!-- <div class="_bd">
            <credit-list :isReceived="isReceived" :credits="groups" @listing="listingHandle" :loading="loading" :finished="finished"/>
        </div> -->

        <div class="_bd">
            <transition :name="transitionName">
                <keep-alive v-if="$route.meta.keepAlive">
                    <router-view class="child-view"></router-view>
                </keep-alive>
                
                <router-view class="child-view" v-if="!$route.meta.keepAlive"></router-view>
            </transition>
        </div>
        
    </div>
</template>

<script>
    import NavBar from '../components/nav-bar.vue'
    import {mapGetters} from 'vuex'
    import store from '../../store'

    export default {
        name:"PointsHistory",
        data(){
            return {
                navs: [
                    {id: '1', name: 'All', path: 'points-all', active: 'points-all' == this.$route.name || 'all' == this.$route.path},
                    {id: '2', name: "Recived", path: 'points-recived', active: 'points-recived' == this.$route.name},
                    {id: '3', name: "Used", path: 'points-used', active: 'points-used' == this.$route.name},
                    {id: '4', name: "Expired", path: 'points-expired', active: 'points-expired' == this.$route.name}
                ],
                transitionName: 'slide-left'
            }
        },
        components:{
            'nav-bar':NavBar,
        },
        methods: {
            listingHandle(){
                if(this.isReceived != "0"){
                    return;
                }
                this.loading = true;
                store.dispatch('me/getCredits',{skip: this.creditskip}).then(({empty, finished}) => {
                    if(empty) this.empty = empty;
                    if(finished) this.finished = finished;
                    this.loading = false;
                    store.dispatch('me/getCreditskip');
                })
            },
            changeMethod(msg){
                this.isReceived = msg;
            }

        },
        computed:{
            ...mapGetters('me', ['credits','creditskip']),
            groups(){
                if(this.isReceived === "0"){
                    return this.credits;
                }

                var items = [];
                this.credits.forEach(item1=>{
                    if(this.isReceived === "2"){
                        if(item1.points<0){
                            items.push(item1);
                        }
                    }else{
                        if(item1.points>0){
                            items.push(item1);
                        }
                    }
                })

                if(items && items.length <= 0) this.finished = true;

                return items;
            },
        },
        // beforeRouteEnter(to, from, next){
        //     let credits = store.getters['me/credits'];

        //     if(credits && credits.length){
        //         next();
        //         return;
        //     }

        //     store.dispatch('me/getCredits', {skip: 0}).then(({empty, finished}) => {
        //         next(vm => {
        //             if(empty) vm.empty = empty
        //             if(finished) vm.finished = finished
        //             store.dispatch('me/getCreditskip');
        //         })
        //         next()
        //     }).catch((e) => {
        //         console.log(e)
        //         next(false)
        //     })
        // },
        watch:{
            '$route' (to, from) {
                const toDepth = to.meta.depth
                const fromDepth = from.meta.depth
                this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
            }
        }
    }
</script>

<style scoped lang="scss">
    .points-history{
        ._hd{
            padding: 0px 30px;
            display: flex;
            height: 46px;
            line-height: 46px;
            border-top: 1px solid #e6e6e6;
    
            & > p{
                width: 25%;
                text-align: center;
                cursor: pointer;

                & span{
                    font-family: 'SlatePro-Medium';
                    font-size: 14px;
	                color: #666666;
                }

                & span.active{
                    font-family: 'AcuminPro-Bold';
                    padding-bottom: 3px;
                    border-bottom: 2px solid #222222;
                }
            }
        }
    }

    .child-view {
        //position: absolute;
        transition: all .5s cubic-bezier(.4, 0, .1, 1);
        width: 100%;
    }

    .slide-left-enter, .slide-right-leave-active {
        opacity: 0;
        -webkit-transform: translate(30px, 0);
        transform: translate(30px, 0);
    }

    .slide-left-leave-active, .slide-right-enter {
        position: absolute;
        opacity: 0;
        -webkit-transform: translate(-30px, 0);
        transform: translate(-30px, 0);
    }
</style>