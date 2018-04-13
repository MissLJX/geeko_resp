<template>
    <div class="c-color-list">
        <div class="label">COLOR</div>
        <div class="content" v-if="products.length">
            <item-color  @color-select="handleColor" v-for="p in products" :product="p" class="c-color"/>
        </div>
    </div>
</template>


<script>
    import ItemColor from './item-color.vue'
    export default {
        name: "ColorList",
        props:['products'],
        components: {'item-color':ItemColor},
        methods:{
            handleColor:function(productId){
                this.$emit('color-select', productId)
            }
        }
    }

</script>

<style lang="scss" scoped>
    .c-color-list{
        display: block;
        margin-top: 20px;
        margin-left: 20px;
        margin-bottom: 15px;
        .label{
            width: 10%;
            display: inline-block;
        }
        .content{
            display: inline-block;
        }
    }
</style>