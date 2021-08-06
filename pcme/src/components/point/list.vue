<template>
    <div class="points-list" ref="fineRef" @scroll="getMore">
        <ul class="st-clear" ref="fineRef" @scroll="getMore">
            <slot v-for="item in items" name="li" :item="item" track-by="$index"></slot>
        </ul>
        <div v-show="loading" class="el-list-loading"><i class="iconfont">&#xe69f;</i></div>
        <div class="el-no-more" v-show="finished && scrollable">{{$t('nomoredata')}}</div>
    </div>
</template>

<style type="scss/text" lang="scss">
    .el-no-more {
        padding: 10px 0;
        text-align: center;
        color: #666;
    }

    .el-list-loading {
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
        max-height: 450px;
        overflow-y: auto;
        padding: 10px 0;
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
        }
    }
</script>