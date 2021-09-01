<template>
    <div class="index-nav-item">
        <div class="_hd" @click="isShow = !isShow">
            <div class="title">{{list.title}}</div>
            <div class="iconfont">{{isShow ?  "&#xe731;" : "&#xe733;"}}</div>
        </div>
        <!-- {{orderStatus}}---{{isActive}} -->
        <transition name="draw">
            <div class="_bd" :style="containerHeight" v-show="isShow">
                <ul v-if="!isOrders">
                    <li 
                        :class="{'active':isActive===item.routerName}"
                        @click="changeClass(item.routerName)"
                        v-for="(item,index) in list.list"
                        :key="index+item.routerName"
                    >
                        <a :href="item.routerPath" v-if="item.pushButton">{{item.name}}</a>
                        <router-link :to="getUrl(item.routerPath)" v-else>{{item.name}}</router-link>
                    </li>
                </ul>

                <ul v-else>
                    <li 
                        :class="{'active':orderStatus===item.status && isActive === 'orders'}"
                        @click="changeStatus(item.status,item.routerName)"
                        v-for="(item,index) in list.list"
                        :key="index+item.routerName"
                    >
                        <a :href="item.routerPath" v-if="item.pushButton">{{item.name}}</a>
                        <router-link :to="getUrl(item.routerPath)" v-else>{{item.name}}</router-link>
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script>
    import {PROJECT} from '../../utils/geekoutil.js'
    import { mapGetters,mapActions } from "vuex"

    export default {
        name:"IndexNavItem",
        data(){
            return {
                isShow:false,
                containerHeight:{height:"0",overflow: "hidden"},
            }
        },
        computed:{
            ...mapGetters(["orderStatus"])
        },
        props:{
            num:{
                type:Number,
                default:0,
                required:true
            },
            list:{
                type:Object,
                required:true,
                default:() => {
                    return {};
                }
            },
            isActive:{
                type:String,
                default:""
            },
            isOrders:{
                type:Boolean,
                default:false
            }
        },
        mounted(){
            this.containerHeight = {height:this.num * 39 + "px",overflow: "hidden"};

            let name = this.$route.name;
            let arr = this.disposeRouteName();
            if(arr.includes(name)){
                this.isShow = true;
            }
        },
        methods:{
            ...mapActions(["changeOrderStatus"]),
            getUrl(suffix){
                return PROJECT + suffix;
            },
            changeClass(name){
                this.$emit("changeRouter",name);
            },
            changeStatus(status,name){
                this.changeOrderStatus(status);
                this.$emit("changeRouter",name);
            },
            disposeRouteName(){
                return this.list.list.map(item => {
                    if(item.routerName === "notification"){
                        return "promotion";
                    }else if(item.routerName === "credits"){
                        return "points-all";
                    }
                    return item.routerName;
                });
            }
        },
        watch:{
            "$route":function(to,form){
                let name = to.name;
                let arr = this.disposeRouteName();
                if(arr.includes(name)){
                    this.isShow = true;
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .index-nav-item{
        .h-title{
            font-family: 'SlatePro-Medium';
            font-size: 20px;
            color: #222222;
        }

        ._hd{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 25px;
            cursor: pointer;

            .title{
                font-family: 'SlatePro-Medium';
                font-size: 18px;
                color: #222222;
                text-transform: capitalize;
            }
        }

        ._bd{
            transition: height .5s;
        }

        ul li {
            // padding: 10px 0;
            cursor: pointer;
            color: #666666;
            a{
                font-size: 14px;
                color: #666666;
                text-decoration: none;
                padding: 10px 0;
                display: inline-block;
                width: 100%;
                text-transform: capitalize;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;

                &:hover{
                    color: #222;
                    /*font-weight: bold;*/
                }
            }
        }

        .active a{
            color: #222 !important;
            font-weight: bold;
        }
    }

    .draw-enter-active, .draw-leave-active {
        transition: all .5s ease;
    }
    .draw-enter, .draw-leave-to /* .fade-leave-active below version 2.1.8 */ {
        height: 0 !important;
        overflow: hidden;
    }
</style>