<template>
    <div class="email-body">
        <page-header>
            <span>Login Protection</span>
        </page-header>
        <user-info></user-info>
        <div v-show="ifOwnEmail" class="emailAddress">
            <p>Email Address</p>
            <input type="text" placeholder="please enter you email" v-model="emailstr">
        </div>
        <div class="senEmailBtn" @click="sendEmail">Send Verification Email</div>
        <process-bar></process-bar>
    </div>
</template>

<script>
    import store from '../../store';
    import PageHeader from '../components/page-header.vue'
    import UserInfo from '../components/user-info.vue'
    import ProcessBar from '../components/process-bar.vue'
    import {mapGetters, mapActions} from 'vuex';

    export default {
        data(){
            return{
                'emailstr':''
            }
        },
        components: {
            'page-header':PageHeader,
            'user-info':UserInfo,
            'process-bar': ProcessBar,
        },
        computed:{
            ...mapGetters('me', [
                'me'
            ]),
            ifOwnEmail(){
                if(this.me.email.endsWith("@chic-fusion.com") || this.me.email.endsWith("@ivrose.com") || this.me.email.endsWith("@boutiquefeel.com")){
                    return true
                }else{
                    return false
                }
            },
        },
        methods:{
            sendEmail(){
                let email = '';
                if(this.me.email && !this.me.email.endsWith("@chic-fusion.com") && !this.me.email.endsWith("@ivrose.com") && !this.me.email.endsWith("@boutiquefeel.com")){
                    email = this.me.email;
                }else{
                    email = this.emailstr;
                }
                store.dispatch('me/confirmEmail', email).then((data)=>{
                    if(data){
                        alert("We've sent you an e-mail,please check your mailbox.");
                        this.$router.go(-1);
                    }else{
                        alert("This mailbox adress is already existed,please re-enter.");
                    }
                });
            }
        }
    }
</script>

<style scoped type="text/css" lang="scss">
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
    .senEmailBtn{
        width: 85%;
        margin: 0 auto;
        background-color: #E5004F;
        height: 50px;
        line-height: 50px;
        color: white;
        text-align: center;
        font-size: 18px;
        cursor: pointer;
    }
    .emailAddress{
        width: 85%;
        margin: 10px auto;
        padding-bottom: 30px;
        p{
            font-size: 18px;
            color: #222;
            margin-bottom: 10px;
        }
        input{
            width: 100%;
            height:40px ;
        }
    }
</style>