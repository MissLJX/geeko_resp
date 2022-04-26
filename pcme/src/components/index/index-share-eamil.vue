<template>
    <div class="index-share-email">
        <div class="mask">
            <div class="confirm-con">
                <h3>{{$t('shareemail')}}</h3>
                <p class="cancel-btn" @click="$emit('update:isShowEmail',false)"><i class="iconfont">&#xe69a;</i></p>
                <form @submit.prevent="sendEmailHandle" accept-charset="utf-8">
                    <div class="email_area">
                        <h4>{{$t('to')}}</h4>
                        <div v-for="(item,index) in inviteCount" :key="item+index">
                            <label>{{$t('friendemail')}}:</label>
                            <input type="email" v-model="item.emailvalue"/>
                        </div>
                    </div>
                    <p v-if="maxCount" class="maxtip">*{{$t('linkcanbeshare')}}</p>
                    <div v-if="!maxCount" class="share-invite-button" @click="inviteMore">+{{$t('invitemore')}}</div>
                    <div class="subject">
                        <label>{{$t('subject')}}:</label>
                        <input type="text" v-model="subinfo"/>
                    </div>
                    <div class="note">
                        <label>{{$t('note')}}:</label>
                        <textarea v-model="noteinfo"></textarea>
                    </div>

                    <button class="share-email-button">{{$t('send')}}</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"IndexShareEmail",
        data(){
            return {
                inviteCount:[{'emailvalue':''},{'emailvalue':''}],
                subinfo:'Sending you up to 50% OFF',
                noteinfo:'This site has so many must-haves. Check out their new arrivals and get up to 50% OFF for your first order!! You’re welcome',
                count:3,
                maxCount:false
            }
        },
        methods:{
            inviteMore(){
                if(this.count>10){
                    this.maxCount = true;
                }else{
                    this.inviteCount.push({'emailvalue':''});
                    this.count +=1
                }
            },
            sendEmailHandle(){
                this.$emit("changeLoadin",true);
                let emails ='';
                _.each(this.inviteCount, (email) => {
                    if(email.emailvalue){
                        emails += email.emailvalue +','
                    }
                });

                if(emails!==''){
                    let shareInfo={'emails':emails.slice(0,-1),'subject':this.subinfo,'content':this.noteinfo}
                    this.$store.dispatch('sendShareEmail', shareInfo).then(() => {
                        alert(this.$t('success'));
                        this.$emit("changeLoadin",false);
                        this.$emit('update:isShowEmail',false)
                    }).catch((e) => {
                        // console.log("e",e);
                        alert(e.result);
                        this.$emit("changeLoadin",false);
                        this.$emit('update:isShowEmail',false)
                    });
                }else{
                    alert("Please enter at least one email address");
                }
            },
        }
    }
</script>

<style scoped lang="scss">
    .mask{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.4);
        text-align: center;
        overflow-y: auto;
        z-index: 999;
        .confirm-con-s{
            width: 484px !important;
            top: calc(50% - 245px);
        }
        .confirm-con-l{
            top: calc(50% - 150px);
            padding-bottom: 90px !important;
            p{
                i{
                    color: #57b936;
                    font-size: 32px;
                    position: relative;
                    top: 6px;
                    right: 10px;
                }
            }
            button{
                outline: none;
            }
        }
        .confirm-con{
            width: 642px;
            margin:40px auto;
            position: relative;
            background-color: white;
            color: #222;
            font-size: 14px;
            padding: 35px 50px;
            text-align: left;
            .term-info{
                color: #666;
                font-size: 12px;
                margin-bottom: 10px;
            }
            .share-invite-button{
                width: 240px;
                line-height: 40px;
                border: 1px solid #cacaca;
                color: #222;
                margin-top: 15px;
                text-transform: uppercase;
                text-align: center;
                cursor: pointer;
            }
            .maxtip{
                color: #E64545;
                font-size: 12px;
                margin-top: 10px;
            }
            .email_area{
                label{
                    display: block;
                    color: #666;
                    margin-bottom: 4px;
                    margin-top: 10px;
                }
            }
            .subject{

                label{
                    display: block;
                    margin-bottom: 4px;
                    margin-top: 20px;
                    font-weight: bold;
                }
            }
            .note{
                label{
                    display: block;
                    margin-bottom: 4px;
                    margin-top: 10px;
                    font-weight: bold;
                }
                textarea{
                    height: 102px;
                    border-radius: 2px;
                    border: solid 1px #cacaca;
                    width: 100%;
                    padding: 10px;
                    color: #4b5056;
                    resize: none;
                }
            }
            .share-email-button{
                outline: none;
                width: 240px;
                height: 40px;
                background-color: #222;
                border-radius: 2px;
                line-height: 40px;
                text-align: center;
                color: #fff;
                text-transform: uppercase;
                font-size: 16px;
                margin-top: 20px;
                border: none;
                outline: none;
                box-shadow:none;
                -webkit-appearance: none;
                cursor: pointer;
            }
            input
            {
                width: 514px;
                line-height: 38px;
                border: 1px solid #cacaca;
                padding-left: 10px;
                color: #4b5056;
            }
            h3{
                margin-bottom: 20px;
            }
            .cancel-btn{
                position: absolute;
                top: 20px;
                right: 16px;
                font-size: 18px;
                color: #666666;
                text-align: right;
                cursor: pointer;
                margin-bottom: 15px;
                i{
                    font-size: 20px;
                }
            }
            .n-btn{
                width: 170px;
                line-height: 32px;
                text-align: center;
                background-color: #222;
                color: #fff;
                margin: 0 auto;
                cursor: pointer;
                margin-top: 26px;
                float: left;
                border-radius: 2px;
                border: none;
            }
        }
    }
</style>