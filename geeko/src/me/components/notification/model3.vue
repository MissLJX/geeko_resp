<template>
    <a :href="url" @click="(e) => geekoSensor(e)">
        <div class="el-model-3-content" v-html="model.content"></div>
    </a>
</template>

<style scoped lang="scss">
    .el-model-3-content {
        line-height: 20px;
        font-size: 13px;
    }
</style>

<script type="text/ecmascript-6">
    import deeplinkmixin from '../../mixins/deeplink'

    export default{
        props: {
            model: {
                type: Object,
                required: true
            }
        },
        mixins: [deeplinkmixin],
        computed:{
            utmTerm(){
                if(this.model.deepLink && this.model.deepLink.utmTerm){
                    return this.model.deepLink.utmTerm
                }
                return 'utmTerm 未返回'
            },
        },
        methods:{
            geekoSensor(e){
                this.$emit("record", this.utmTerm)
            }
        }
    }
</script>