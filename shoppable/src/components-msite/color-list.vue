<template>
    <div class="c-color-list">
        <div class="label">COLOR</div>
        <div class="content" v-if="products.length">
            <item-color  @color-select="handleColor" v-for="p in products" :key="p.id" :product="p" class="c-color"/>
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
        margin-top: 10px;
        margin-left: 10px;
        margin-bottom: 8px;
        .label{
            font-size: 12px;
            width: 15%;
            display: inline-block;
        }
        .content{
            display: inline-block;
        }
    }
</style>