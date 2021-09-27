<template>
    <div class="point-policy">
        <nav-bar>
            <i class="iconfont el-back-font" slot="left" @click="$router.go(-1)">&#xe693;</i>
            <span slot="center">{{$t("point.my_points")}}</span>
            <a :href="GLOBAL.getUrl('/fs/points-policy')" slot="right">
                <span class="iconfont" style="font-size:20px;color:#222222;">&#xe73f;</span>
            </a>
        </nav-bar>

        <template v-for="(item,index) in list">
            <router-link v-if="!item.isApp" :to="{name:disposePath(item.type)}" class="item" :key="index+item"  @click.native="item.isClick && disposeEmail($event)">
                <p class="hd">
                    {{item.title}}
                </p>

                <div class="bd">
                    <p class="font">{{item.content}}</p>
                </div>
            </router-link>
        </template>
    </div>
</template>

<script>
    import NavBar from '../components/nav-bar.vue'
    export default {
        name:"PointGuide",
        data(){
            // let list = [
            //     {
            //         title:"Improve your size information  >",
            //         content:[
            //                     "Complete your personal size information and you",
            //                     "will earn 100 points.",
            //                     "We will keep the information you fill in strictly",
            //                     "confidential."
            //                 ],
            //         name:"my-preference",
            //         isAllowClick:false
            //     },
            //     {
            //         title:"Improve your preference  >",
            //         content:[
            //                     "Complete your personal preference and you will",
            //                     "earn 100 points.",
            //                     "We will keep the information you fill in strictly",
            //                     "confidential."
            //                 ],
            //         name:"my-measurements",
            //         isAllowClick:false
            //     },
            //     {
            //         title:"Verify the email  >",
            //         content:[
            //                     "Verify the email you can earn 100 points."
            //                 ],
            //         name:"",
            //         isAllowClick:true
            //     }
            // ];

            return {
                list:[]
            }
        },
        components:{
            'nav-bar':NavBar,
        },
        computed:{
            email(){
                return this.$store.getters["me/me"].email;
            },
            isConfirmEmail(){
                return this.$store.getters["me/me"].isConfirmEmail;
            },
            ifOwnEmail(){
                if(this.email.endsWith("@chic-fusion.com") || this.email.endsWith("@ivrose.com") || this.email.endsWith("@boutiquefeel.com")){
                    return true
                }else{
                    return false
                }
            }
        },
        created: async function(){
            let list = await this.$store.dispatch("me/getPointsRulesGuide","M1538");
            this.list = list;
        },
        methods:{
            disposeEmail(e){
                e.preventDefault();
                this.disposeNotification();
            },
            disposeNotification(){
                if(this.ifOwnEmail){
                    this.$router.push({name:"change-email"});
                }else{
                    this.verifyEmail(this.email);
                }
            },
            verifyEmail(email){
                let _this = this;
                if(!this.isConfirmEmail){
                    this.$store.dispatch("globalLoadingShow",true);
                    this.$store.dispatch('me/confirmEmail', email).then((data)=>{
                        this.$store.dispatch("globalLoadingShow",false);
                        _this.modalShow("A verification link has been sent to your email address, please check your mailbox.");
                    }).catch((e) => {
                        console.log("This mailbox adress is already existed,please re-enter.");
                    });
                }else{
                    _this.modalShow("Your email has been verified, please use other ways to get points.");
                }
            },
            modalShow(message){
                let _this = this;
                _this.$store.dispatch('confirmShow', {
                    show: true,
                    cfg: {
                        btnFont:{
                            yes:"OK",
                        },
                        message: message,
                        yes: function () {
                            _this.$store.dispatch('closeConfirm');
                            _this.$emit("update:notificationData",[]);
                        },
                        no: function () {
                        }
                    }
                })
            },
            disposePath(type){
                let str = "";
                switch(type){
                    case 1:
                        str = "my-measurements";
                        break;
                    case 2:
                        str = "my-preference";
                        break;
                    default:
                }

                return str;
            }
        }
    }
</script>

<style scoped lang="scss">
    .point-policy{
        .item{
            border-top: 1px solid #eeeeee;
            padding: 0px 12px 10px 12px;
            display: inline-block;
            width: 100%;
            .hd{
                margin-top: 10px;
                font-size: 14px;
                color: #222222;
                font-family: 'AcuminPro-Bold';
            }

            .bd{
                margin-top: 10px;

                .font{
                    font-size: 12px;
                    color: #999999;
                }
            }
        }
    }
</style>