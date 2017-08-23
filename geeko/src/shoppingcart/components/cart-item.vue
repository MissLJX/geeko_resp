<template>
    <li>
        {{item.productName}}
        <link-image :src="item.productUrl"/>
    </li>
</template>

<style scoped lang="scss">

</style>

<script type="text/ecmascript-6">

    import LinkImage from '../../components/link-image.vue'

    export default{
        props:['item'],
        components:{
            'link-image': LinkImage
        }
    }
</script>