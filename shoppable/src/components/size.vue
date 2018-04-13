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
        padding: 10px 15px;
        border: 1px solid #f5b2a2;
        display: inline-block;
        cursor: pointer;
        margin-top: 10px;
    }

    .c-size.selected{
        background-color: #f5b2a2;
        color: white;
    }
</style>