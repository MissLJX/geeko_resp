<template>
    <div class="points-history">
        <nav-bar>
            <i class="iconfont el-back-font" slot="left" @click="$router.go(-1)">&#xe693;</i>
            <span slot="center">Points History</span>
        </nav-bar>

        <div class="_hd">
            <p @click="changeMethod('0')">
                <span :class="{'active' : this.isReceived == '0'}">All</span>
            </p>
            <p @click="changeMethod('1')">
                <span :class="{'active' : this.isReceived == '1'}">Recived</span>
            </p>
            <p @click="changeMethod('2')">
                <span :class="{'active' : this.isReceived == '2'}">Used</span>
            </p>
            <p @click="changeMethod('3')">
                <span :class="{'active' : this.isReceived == '3'}">Expired</span>
            </p>
        </div>

        <div class="_bd">
            <credit-list :isReceived="isReceived" :credits="groups" @listing="listingHandle" :loading="loading" :finished="finished"/>
        </div>
    </div>
</template>

<script>
    import NavBar from '../components/nav-bar.vue'
    import CreditList from '../components/credit-list.vue'
    import {mapGetters} from 'vuex'
    import store from '../../store'

    export default {
        name:"PointsHistory",
        data(){
            return {
                loading: false,
                finished: false,
                empty: false,
                isReceived:"0"
            }
        },
        components:{
            'nav-bar':NavBar,
            'credit-list': CreditList,
        },
        methods: {
            listingHandle(){
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
        beforeRouteEnter(to, from, next){
            let credits = store.getters['me/credits'];

            if(credits && credits.length){
                next();
                return;
            }

            store.dispatch('me/getCredits', {skip: 0}).then(({empty, finished}) => {
                next(vm => {
                    if(empty) vm.empty = empty
                    if(finished) vm.finished = finished
                })
                next()
            }).catch((e) => {
                console.log(e)
                next(false)
            })
        },
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

                & > span{
                    font-family: 'SlatePro-Medium';
                    font-size: 14px;
	                color: #666666;
                }

                & > span.active{
                    font-family: 'AcuminPro-Bold';
                    padding-bottom: 3px;
                    border-bottom: 2px solid #222222;
                }
            }
        }
    }
</style>