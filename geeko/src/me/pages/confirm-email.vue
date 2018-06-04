<template>
    <div class="email-body">
        <page-header>
            <span>Login Protection</span>
        </page-header>
        <user-info></user-info>
        <email-address></email-address>
        <send-btn></send-btn>
        <process-bar></process-bar>
    </div>
</template>

<script>
    import PageHeader from '../components/page-header.vue'
    import UserInfo from '../components/user-info.vue'
    import SendBtn from '../components/send-btn.vue'
    import ProcessBar from '../components/process-bar.vue'
    import EmailAddress from '../components/email-address.vue'

    export default {
        components: {
            SendBtn,
            'page-header':PageHeader,
            'user-info':UserInfo,
            'send-btn':SendBtn,
            'process-bar': ProcessBar,
            'email-address':EmailAddress
        }
    }
</script>

<style scoped>
    html{
        height: 100%;
    }
    body{
        height: 100%;
        margin: 0;
    }
    .email-body{
        height: 100%;
        background-color: #fff;
    }
</style>