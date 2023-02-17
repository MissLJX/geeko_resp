<template>
    <div class="points-list" ref="fineRef" @scroll="getMore">
        <ul class="st-clear" ref="fineRef" @scroll="getMore">
            <slot v-for="(item, index) in items" name="li" :item="item" :itemIndex="index" track-by="$index"></slot>
        </ul>
        <div v-show="loading" class="el-list-loading-1"><i class="iconfont">&#xe69f;</i></div>
        <div class="el-no-more" v-show="showDefaultNoMore">{{$t('nomoredata')}}</div>
        <div class="view-no-more" v-show="showRecentNoMore">
            <span>{{$t('recently_view_nothing')}}</span>
            <button class="goShoppingBtn" @click="goShopping()">{{$t('survey.survey_go_shopping')}}</button>
        </div>
    </div>
</template>

<style type="scss/text" lang="scss" scoped>
    .el-no-more {
        padding: 10px 0;
        text-align: center;
        color: #666;
    }

    .el-list-loading-1 {
        text-align: center;
        padding: 10px 0;
        i {
            font-size: 24px;
            display: inline-block;
            animation: list-loading 1.5s infinite linear;
        }
    }

    @keyframes list-loading {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .points-list{
        min-height: 450px;
        max-height: 490px;
        overflow-y: auto;
        padding: 10px 0;

        /*定义整体的宽度*/
        &::-webkit-scrollbar {
            width: 6px;
        }
        /*定义滚动条轨道*/
        &::-webkit-scrollbar-track {
            border-radius: 5px;
        }
        /*定义滑块*/
        &::-webkit-scrollbar-thumb {
            width: 6px;
            border-radius: 3px;
            background-color: #cccccc;
        }
        &::-webkit-scrollbar-thumb:hover{
            background-color: #999; 
        }
    }

    .view-no-more{
        text-align: center;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC, Roboto;
        font-weight: 400;
        color: #9C9C9C;
        line-height: 17px;
        margin-top: 100px;
    }

    .goShoppingBtn{
        border: none;
        width: 178px;
        height: 31px;
        background: #222222;
        line-height: 31px;
        font-family: AcuminPro-Bold;
        font-size: 14px;
        font-weight: bold;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
        text-transform: capitalize;
        text-align: center;
        cursor: pointer;
        margin-top: 16px;
    }
</style>

<script type="text/ecmascript-6">
    export default{
        props: {
            items: {
                type: Array,
                required: true
            },
            loading: {
                type: Boolean,
                default: false
            },
            scrollable: {
                type: Boolean,
                default: true
            },
            finished: {
                type: Boolean,
                default: true
            },
            type:{
                type: String,
                default: '',
            }
        },
        methods: {
            getMore(){
                let clientHeight = this.$refs.fineRef.clientHeight;
                let scrollTop=this.$refs.fineRef.scrollTop;
                let scrollHeight=this.$refs.fineRef.scrollHeight;
        
                //滚动条到底部的条件:div 到头部的距离 + 屏幕高度 = 可滚动的总高度
                if(scrollTop+clientHeight === scrollHeight){
                    if (!this.loading && !this.finished) {
                        this.$emit('listing');
                    }
                }
            },
            goShopping(){
                window.location.href = '/';
                return
            }
        },
        computed:{
            showDefaultNoMore(){
                return this.type != 'recently_view' && this.finished && this.scrollable
            },
            showRecentNoMore(){
                return this.type == 'recently_view' && this.finished && this.scrollable
            }
        }
    }
</script>