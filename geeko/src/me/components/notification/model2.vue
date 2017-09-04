<template>
    <div class="el-model-2">
        <figure>
            <img :src="model.image"/>
            <figcaption>
                <div v-html="model.content"></div>
            </figcaption>
        </figure>
    </div>
</template>

<style scoped lang="scss">
    .el-model-2{
        img{
            display: block;
            width: 100%;
        }

        figcaption{
            padding: 10px 0 0 0;
            font-size: 12px;
            line-height: 18px;
        }
    }
</style>

<script type="text/ecmascript-6">
    export default{
        props: {
            model: {
                type: Object,
                required: true
            }
        }
    }
</script>