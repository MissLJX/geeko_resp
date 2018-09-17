<template>
    <div class="userinfo">
        <p>Your {{sitename}} account:</p>
        <p class="user-email">{{me.email}}</p>
        <p>has not been verified with Email</p>
        <p>Please verify your Email</p>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';

    export default {
        computed:{
            ...mapGetters('me', [
                'me'
            ]),
            sitename(){
                return site
            }
        }
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