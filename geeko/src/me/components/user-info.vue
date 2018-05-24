<template>
    <div class="userinfo">
        <p>Your chicme account:</p>
        <p class="user-email">*****@gmail.com</p>
        <p>has not been verified with Email</p>
        <p>Please verify your Email</p>
    </div>
</template>

<script>
    export default {
        name: "user-info.vue"
    }
</script>

<style scoped>
    .userinfo{
        text-align: center;
        font-size: 16px;
        color: #666;
        line-height: 32px;
        padding: 31px 0px;
    }
    .user-email{
        color: #E5004F;
    }
</style>