<template>
    <div class="bottom-to-top">
        <transition name="add-cart">
            <slot></slot>
        </transition>
    </div>
</template>

<script>
    export default {
        name:"BottomToTop"
    }
</script>

<style scoped lang="scss">
    .add-cart-enter-active, .add-cart-leave-to{
        bottom:0 !important;
    }

    .add-cart-enter-active , .add-cart-leave-active{
        transition: bottom .5s !important;
    }

    .add-cart-leave-active , .add-cart-enter{
        bottom:-100% !important;
    }
</style>