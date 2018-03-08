<template>
    <a :href="url">
        <div class="st-table">
            <div class="st-cell el-model-1-image st-v-t" :class="{'deep1': isSqure}">
                <img :src="imageUrl">
            </div>
            <div class="st-cell el-model-1-content st-v-t" v-html="model.content"></div>
        </div>
    </a>
</template>

<style scoped lang="scss">
    .el-model-1-image {
        width: 60px;
        img {
            display: block;
            width: 100%;
        }

        &.deep1 {
            width: 40px;
        }
    }

    .el-model-1-content {
        padding-left: 10px;
        font-size: 12px;
        line-height: 18px;
    }

</style>

<script type="text/ecmascript-6">
    import _ from 'lodash'
    import deeplinkmixin from '../../mixins/deeplink'
    import imageUrlmixin from '../../mixins/imageUrl'

    export default{
        props: {
            model: {
                type: Object,
                required: true
            }
        },
        mixins: [deeplinkmixin, imageUrlmixin],
        computed: {
            isSqure(){
                return false
            }
        }
    }
</script>