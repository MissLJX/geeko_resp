<template>
    <div id="shoppingcart">

    </div>
</template>

<style type="scss/text" lang="scss">

</style>

<script type="text/ecmascript-6">
    export default{
        computed: {
            shoppingCart(){
                return this.$store.getters.shoppingCart
            }
        }
    }
</script>