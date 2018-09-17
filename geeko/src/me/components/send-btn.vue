<template>
    <div>
        <div class="senEmailBtn" @click="sendEmail">Send Verification Email</div>
    </div>
</template>

<script>
    import store from '../../store';
    import {mapGetters, mapActions} from 'vuex';

    export default {
        name: "send-btn.vue",
        computed:{
            ...mapGetters('me', [
                'me'
            ])
        },
        methods:{
            sendEmail(){
                store.dispatch('me/confirmEmail', this.me.email).then((data)=>{
                      if(data.success){

                      }
                });
            }
        }
    }
</script>

<style scoped>
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
</style>