<template>
        <span class="c-color" :class="{'selected': product.selected}" @click="handleSelect"><img :src="image"/></span>
</template>

<script>
    export default {
        name: "item-color",
        props: ['product'],
        computed: {
            image(){
                return `https://image.geeko.ltd/medium/${this.product.pcMainImage}`;
            }
        },
        methods: {
            handleSelect(){
                this.$emit('color-select',this.product.id)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .c-color{
        display: inline-block;
        cursor: pointer;
        width: 50px;
        height: 64px;
        margin-right: 10px;
        border: 1px solid #e3e3e3;
    }

    .c-color.selected{
        border: 1px solid #f5b2a2;
    }

    .c-color img{
        width: 100%;
    }
</style>