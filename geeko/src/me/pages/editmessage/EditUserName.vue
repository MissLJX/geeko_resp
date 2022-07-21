<template>
    <div class="edit-user-name">
        <edit-message-container :header-title="$t('index.name')" :btn-name="$t('label.save')" @toSubmit="addUserName">
            <div>
                <input 
                    maxlength="100"
                    type="text" 
                    name="firstName" 
                    autocomplete="off"
                    v-model="name.firstName"
                    :placeholder="$t('label.firstName')"
                >
            </div>

            <div>
                <input 
                    maxlength="100"
                    type="text" 
                    name="lastName" 
                    autocomplete="off"
                    v-model="name.lastName"
                    :placeholder="$t('label.lastName')"
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
    import _ from "lodash"
    
    export default {
        name:"EditUserName",
        components:{
            "edit-message-container":EditMessageContainer
        },
        data(){
            return {
                name:{
                    firstName:"",
                    lastName:""
                },
                isLoadingShow:false
            }
        },
        computed:{
            ...mapGetters("me",["me"])
        },
        methods:{
            addUserName(){
                let _this = this;
                _this.isLoadingShow = true;
                let obj = {
                    customer:{
                        "name":this.name
                    },
                    name:"name"
                };
                store.dispatch("me/updateCustomerSave",obj).then(result => {
                    _this.isLoadingShow = false;
                    _this.$router.go(-1);
                }).catch(err => alert(err && err.result));
            }
        },
        created(){
            this.name = _.cloneDeep(this.me.name);
        }
    }
</script>

<style scoped lang="scss">
    .edit-user-name{
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