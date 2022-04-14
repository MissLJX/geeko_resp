<template>
    <div class="empty_page">
        <span class="empty_logo iconfont">&#xe7c6;</span>
        <span class="empty_txt">{{$t("notification.empty_here")}} :-(</span>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    .empty_page{
        width: 100%;
        height: 70vh;
        background: #f5f5f5;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        font-family: Roboto-Regular;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #999999;
    }
    .empty_logo{
        font-size:82px;
        color: #999999;
        margin-bottom: 50px;
    }
</style>