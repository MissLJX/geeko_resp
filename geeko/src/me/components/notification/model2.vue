<template>
    <div class="el-model-2">
        <a :href="url">
            <figure>
                <figcaption>
                    <div v-html="model.content"></div>
                </figcaption>

                <img :src="imageUrl"/>

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
            padding: 0 0 10px 0;
            border-bottom: 2px solid #e7e7e7;
            margin-bottom:10px;
            font-size: 13px;
            line-height: 18px;
            text-align: center;
        }
    }
</style>

<script type="text/ecmascript-6">

    import deeplinkmixin from '../../mixins/deeplink'
    import imageUrlmixin from '../../mixins/imageUrl'

    export default{
        props: {
            model: {
                type: Object,
                required: true
            }
        },
        mixins: [deeplinkmixin, imageUrlmixin]
    }
</script>