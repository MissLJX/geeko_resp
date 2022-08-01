<template>
    <div ref="listRef">
        <ul class="st-clear">
            <slot v-for="(item,index) in items" name="li" :item="item" track-by="$index" :index="index"></slot>
        </ul>
        <div v-show="loading" class="el-list-loading"><i class="iconfont">&#xe69f;</i></div>
        <div class="el-no-more" v-show="showNoData && finished && scrollable">{{$t('label.no_more_data')}}.</div>
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
</style>

<script type="text/ecmascript-6">
    export default{
        name:"RefScrollList",
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
            showNoData: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            scrollHandle(evt){
                evt.preventDefault()
                // let [scrollTop, documentHeight, windowHeight] = [
                //     document.documentElement.scrollTop || document.body.scrollTop,
                //     document.body.clientHeight,
                //     window.screen.height
                // ]
                
                let clientHeight = this.$refs.listRef.clientHeight;
                let scrollTop = this.$refs.listRef.scrollTop;
                let scrollHeight = this.$refs.listRef.scrollHeight;
                if (scrollTop + clientHeight + 100 > scrollHeight) {
                    if (!this.loading && !this.finished) {
                        this.$emit('listing')
                    }
                }
            }
        },
        mounted(){
            if (this.scrollable){
                this.$refs.listRef.addEventListener('scroll', this.scrollHandle)
            }
        
        },
        destroyed(){
            this.$refs.listRef.removeEventListener('scroll', this.scrollHandle)
        },
        activated(){
            if (this.scrollable){
                this.$refs.listRef.addEventListener('scroll', this.scrollHandle)
            }
        },
        deactivated(){
            this.$refs.listRef.removeEventListener('scroll', this.scrollHandle)
        }
    }
</script>