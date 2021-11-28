<template>
    <div class="index-nav-one-item" @click="toRoute">
        {{$t("index.my_wishlist")}}
    </div>
</template>

<script>
    export default {
        name:"IndexNavOneItem",
        methods:{
            toRoute(){
                this.$emit("changeRouter","wishlist");
                this.$router.push("/me/m/wishlist");
            }
        }
    }
</script>

<style lang="scss" scoped>
    .index-nav-one-item{
        font-size: 18px;
        color: #222222;
        font-family: 'SlatePro-Medium';
        margin-top: 20px;
        cursor: pointer;
    }
</style>