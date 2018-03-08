<template>
    <a :href="url" class="el-model-6">
        <div class="content" v-html="model.content"></div>
        <div class="st-table st-fullwidth el-model6-images">
            <div class="st-cell">
                <img :src="prefix + model.images[0]"/>
            </div>
            <div class="st-cell">
                <img :src="prefix + model.images[1]"/>
            </div>
            <div class="st-cell">
                <img :src="prefix + model.images[2]"/>
            </div>
            <div class="st-cell">
                <img :src="prefix + model.images[3]"/>
            </div>
        </div>
    </a>
</template>

<style scoped lang="scss">
    .content{
        text-align: center;
        padding-bottom: 10px;
    }
    .el-model6-images{
        & > div{
            width: 25%;
            vertical-align: top;
            img{
                display: block;
                width:100%;
            }
        }
    }

    .el-model-6{
        .content{
            font-size: 13px;
            padding-top: 5px;
            line-height: 20px;
        }
    }
</style>

<script type="text/ecmascript-6">

    import deeplinkmixin from '../../mixins/deeplink'
    import {IMAGE_PREFIX} from '../../../utils/geekoutils'

    export default{
        props: {
            model: {
                type: Object,
                required: true
            }
        },
        mixins: [deeplinkmixin],
        computed: {
            prefix(){
                return IMAGE_PREFIX
            }
        }
    }
</script>