<template>
    <span class="c-size" @click="handleSelect" :class="{'selected':variant.selected}">{{variant.size}}</span>
</template>

<script>
    export default {
        name: "size",
        props: ['variant'],
        methods: {
            handleSelect(){
                this.$emit('size-select', this.variant);
            }
        }
    }
</script>

<style scoped>
    .c-size{
        margin-right: 10px;
        font-size: 12px;
        padding: 2px 4px;
        margin-bottom: 5px;
        border: 1px solid #f5b2a2;
        display: inline-block;
        cursor: pointer;
    }

    .c-size.selected{
        background-color: #f5b2a2;
        color: white;
    }
</style>