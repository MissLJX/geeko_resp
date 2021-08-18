<template>
    <div class="edit-message-container">
        <nav-bar class="add-border">
            <i class="iconfont el-back-font" slot="left" @click="$router.go(-1)">&#xe693;</i>
            <span slot="center">{{headerTitle}}</span>
        </nav-bar>

        <div class="edit-container">
            <slot></slot>
        </div>

        <submit-btn @toSubmit="$emit('toSubmit')" :title="btnName" class="edit-footer" active-fixed="true"></submit-btn>
    </div>
</template>

<script>
    import NavBar from "../nav-bar.vue"
    import SubmitBtn from "../../../components/submit-btn.vue"

    export default {
        name:"EditMessageContainer",
        components:{
            "nav-bar":NavBar,
            "submit-btn":SubmitBtn
        },
        props:["headerTitle","btnName"]
    }
</script>

<style scoped>
    .add-border{
        border-bottom: 1px solid #f5f5f5;
    }
</style>
