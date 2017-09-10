<template>
    <div class="el-model-2">
        <a :href="url">
            <figure>
                <img :src="model.image"/>
                <figcaption>
                    <div v-html="model.content"></div>
                </figcaption>
            </figure>
        </a>
    </div>
</template>

<style scoped lang="scss">
    .el-model-2 {
        img {
            display: block;
            width: 100%;
        }

        figcaption {
            padding: 10px 0 0 0;
            font-size: 12px;
            line-height: 18px;
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
        mixins: [deeplinkmixin]
    }
</script>