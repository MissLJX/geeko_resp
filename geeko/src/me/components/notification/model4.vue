<template>
    <div>
        <a :href="url">
            <div class="st-table st-fullwidth">
                <div class="st-cell st-v-m">
                    <span class="st-small-font" v-html="model.content"></span>
                </div>
                <div class="st-cell st-v-m st-t-r">
                    <span class="el-credit-num" :class="{'green':model.num < 0}">{{num}}</span>
                </div>
            </div>
        </a>
    </div>
</template>

<style scoped lang="scss">
    .el-credit-num {
        color: #e5004f;
        &.green {
            color: green;
        }
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
        computed: {
            num(){
                return this.model.num < 0 ? this.model.num : ('+' + this.model.num)
            }
        },
        mixins: [deeplinkmixin]
    }
</script>