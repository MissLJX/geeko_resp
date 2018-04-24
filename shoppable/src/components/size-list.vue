<template>
    <div class="c-size-list">
        <div class="label">SIZE</div>
        <div class="content" v-if="variants.length">
            <size v-for="variant in variants" :variant="variant" :key="variant.id"  class="c-size" @size-select="handleSize"/>
        </div>
    </div>
</template>

<script>

    import Size from './size.vue'

    export default {
        name: "SizeList",
        props:["variants"],
        components: {
            Size
        },
        methods:{
            handleSize:function(variant){
                this.$emit("size-select",variant);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .c-size-list{
        display: block;
        margin-left: 20px;
        margin-bottom: 15px;
        .label{
            width: 12%;
            font-size: 18px;
            display: inline-block;
        }
        .content{
            display: inline-block;
        }
    }
</style>