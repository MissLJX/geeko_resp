<template>
    <div class="edit-bio">
        <edit-message-container :header-title="'Bio'" :btn-name="$t('label.save')" @toSubmit="addUserNickName">
            <div>
                <textarea 
                    maxlength="100" 
                    name="bio" 
                    v-model="bio"
                >
                </textarea>
                <div class="_num">
                    <span>{{bioNum}}/100</span>
                </div>
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
                bio:"",
                isLoadingShow:false
            }
        },
        computed:{
            ...mapGetters("me",["me"]),
            bioNum(){
                return this.bio ? 100 - this.bio.length : 0;
            }
        },
        methods:{
            addUserNickName(){
                let _this = this;
                _this.isLoadingShow = true;
                let obj = {
                    customer:{
                        "bio":this.bio
                    },
                    name:"bio"
                };
                store.dispatch("me/updateCustomerSave",obj).then(result => {
                    _this.isLoadingShow = false;
                    _this.$router.go(-1);
                }).catch(erros =>{
                    _this.isLoadingShow = false;
                })
            }
        },
        created(){
            this.bio = this.me.bio;
        }
    }
</script>

<style scoped lang="scss">
    .edit-bio{
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

            textarea{
                width: 100%;
                height: 100px;
                border-radius: 2px;
                border: none;
                resize: none;
                color: #bbbbbb;
                font-size: 12px;
                padding: 10px;
            }

            ._num{
                text-align: right;
                padding-right: 10px;
                font-size: 12px;
                color: #999999;
                line-height: 40px;
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