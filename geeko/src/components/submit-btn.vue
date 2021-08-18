<template>
    <div class="footer-btn" :class="{'edit-footer' : activeFixed}">
        <div class="btn-cllick"  @click="$emit('toSubmit')">{{title}}</div>
    </div>
</template>

<script>
export default {
    name:"SubmitBtn",
    props:["title","activeFixed"]
}
</script>

<style scoped lang="scss">
    .footer-btn{
        width: 100%;
        position: fixed;
        bottom: 51px;
        left: 0px;
        right: 0px;
        text-align: center;
        padding: 0px 13px 20px 13px;

        .btn-cllick{
            height: 42px;
            line-height: 42px;
            background-color: #222222;
            font-family: SlatePro-Medium;
            font-size: 17px;
            color: #ffffff;
            text-transform: uppercase;
        }
    }

    .edit-footer{
        position: relative;
        bottom: 0px;
        padding-top: 50px;
        background-color: #f5f5f5;
    }
</style>