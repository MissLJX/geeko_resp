
<template>
    <div class="points-message" v-if="maskShow">
        <div class="pointsMaskBox">
            <div class="pointsMaskTitle">{{$t("points_mall.points_mall")}}</div>
            <div class="pointsMaskContent">{{content}}</div>
            <div class="pointsMaskBtn">
                <div v-for="(item, index) in btnList"
                     :class="{'points_btn_white':item.color=='white','points_btn_black':item.color=='black'}"
                     :key="item+index"
                     @click="pointsMaskBtnClick(item.type)"
                     >{{item.content}}</div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import ProductList from '../../components/product-list.vue'
    import store from '../../store/index.js'
    export default{
        props:{
            maskShow:{
                type:Boolean,
                default: false,
            },
            content:{
                type: String,
                default: 'Please sign in/register to add the Points Mall item.'
            },
            btnList:{
                type: Array,
                default: [
                    {
                        color: 'white',
                        content: 'Cancel',
                        type: '1'
                    },
                    {
                        color: 'white',
                        content: 'Cancel',
                        type: '2'
                    },
                ]
            }
        },
        data(){
            return{
                loading:false,
                finished: false,
                empty: false,
                requestId:"",
                experimentId:""
            }
        },
        computed: {
            products(){
                // return store.getters['me/pointsProducts']
            }
        },
        methods: {
            pointsMaskBtnClick(type){
                this.$emit("btnClick", type)
            }
        },
        components: {
        },
        created(){
        }
    }
</script>

<style scoped lang="scss">
    .points-message{
        width: 100%;
        height: 100vh;
        background: rgba(0,0,0,0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        z-index:10;

        .pointsMaskBox{
            padding: 10px 8px 8px;
            background: #fff;
            border-radius: 2px;
            font-family: 'ACUMINPRO-BOLD';
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #222222;
            text-align: center;
            width: 80%;
        }
        .pointsMaskTitle{
        
        }
        .pointsMaskContent{
            font-family: 'SlatePro-Medium';
            line-height: 18px;
            margin-top: 14px;
        }
        .pointsMaskBtn{
        }
        .points_btn_black{
            height: 36px;
            background-color: #222222;
            border-radius: 2px;
            color: #fff;
            line-height: 36px;
            margin-top: 10px;
            cursor: pointer;
        }
        .points_btn_white{
            height: 36px;
            border-radius: 2px;
            line-height: 36px;
            border: 1px solid #222;
            margin-top: 10px;
            cursor: pointer;
        }
    }
</style>