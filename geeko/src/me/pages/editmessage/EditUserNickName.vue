<template>
    <div class="edit-nickname">
        <edit-message-container :header-title="$t('index.nickName')" :btn-name="$t('label.save')" @toSubmit="addUserNickName">
            <div>
                <input 
                    maxlength="100"
                    type="text" 
                    name="nickName" 
                    autocomplete="off"
                    v-model="nickName"
                    :placeholder="$t('index.nick_name')"
                >
            </div>
        </edit-message-container>

        <loading v-if="isLoadingShow"></loading>
    </div>
</template>

<script>
    import EditMessageContainer from "../../components/editmessage/EditMessageContainer.vue"
    import store from "../../../store/index.js"
    import { mapGetters } from "vuex"
    
    export default {
        name:"EditUserName",
        components:{
            "edit-message-container":EditMessageContainer
        },
        data(){
            return {
                nickName:"",
                isLoadingShow:false
            }
        },
        computed:{
            ...mapGetters("me",["me"])
        },
        methods:{
            addUserNickName(){
                let _this = this;
                _this.isLoadingShow = true;
                let obj = {
                    customer:{
                        "nickname":this.nickName
                    },
                    name:"nickname"
                };
                store.dispatch("me/updateCustomerSave",obj).then(result => {
                    _this.isLoadingShow = false;
                    _this.$router.go(-1);
                }).catch(err => alert(err && err.result));
            }
        },
        created(){
            this.nickName = this.me.nickname;
        }
    }
</script>

<style scoped lang="scss">
    .edit-nickname{
        .edit-container{
            input{
                height: 60px;
                background-color: #ffffff;
                width: 100%;
                border: none;
                border-top: 1px solid #f5f5f5;
                border-bottom: 1px solid #f5f5f5;
                padding-left: 14px;
                font-size: 14px;
            }

            .st-input-danger{
                border: 1px solid red;
            }

            .st-is-danger{
                color: red;
            }
        }
    }
</style>