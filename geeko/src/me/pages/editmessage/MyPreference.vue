<template>
    <div class="my-preference">
        <nav-bar>
            <i class="iconfont el-back-font" slot="left" @click="$router.go(-1)">&#xe693;</i>
            <span slot="center">{{$t("index.my_preference")}}</span>
        </nav-bar>

        <my-preference-item 
            :category="messageM1521.favoriteCategories" 
            :title="$t('index.whitch_are_your_favorite')"
            @getValue="getCategoryValue"
            :favorite="myPreference.favoriteCategories"
        ></my-preference-item>

        <my-preference-item 
            :category="messageM1521.usuallyBuyClothesFor" 
            :title="$t('index.who_do_you_ususlly')"
            @getValue="getUsuallyValue"
            :favorite="myPreference.usuallyBuyClothesFor"
        ></my-preference-item>

        <my-preference-item 
            :category="messageM1521.favoriteStyles" 
            :title="$t('index.whitch_are_your_styles')"
            @getValue="getCategoryStylesValue"
            :favorite="myPreference.favoriteStyles"
        ></my-preference-item>

        <submit-btn @toSubmit="addPreference" :title="$t('label.save')"></submit-btn>

        <points-reminder-modal :reminderMessage="reminderMessage" @onClose="() =>this.reminderMessage=null" v-if="!!reminderMessage" />

        <loading v-if="isLoadingShow"></loading>
    </div>
</template>

<script>
    import NavBar from "../../components/nav-bar.vue"
    import MyPreferenceItem from "../../components/editmessage/MyPreferenceItem.vue"
    import SubmitBtn from "../../../components/submit-btn.vue"
    import store from "../../../store/index.js"
    import { mapGetters } from "vuex"
    import PointsReminderModal from "../../../components/modal/points-reminder-modal.vue"

    export default {
        name:"MyPreference",
        components:{
            "nav-bar":NavBar,
            "my-preference-item":MyPreferenceItem,
            "submit-btn":SubmitBtn,
            "points-reminder-modal":PointsReminderModal
        },
        computed:{
            ...mapGetters("me",["me","messageM1521"])
        },
        data(){
          return {
                favoriteCategories : [{
                    "value" : "women",
                    "label" : "Women"
                },{
                    "value" : "curve+plus",
                    "label" : "Curve+Plus"
                }],
                usuallyBuyClothesFor : [{
                    "value" : "myself",
                    "label" : "Myself"
                },{
                    "value" : "parthner",
                    "label" : "Parthner"
                },{
                    "value" : "Parents",
                    "label" : "parents"
                }],
                favoriteStyles : [{
                    "value" : "basics",
                    "label" : "Basics"
                },{
                    "value" : "casual",
                    "label" : "Casual"
                },{
                    "value" : "elegant",
                    "label" : "Elegant"
                }],
                myPreference:{
                    favoriteCategories:[],
                    usuallyBuyClothesFor:[],
                    favoriteStyles:[]
                },
                isLoadingShow:false,
                reminderMessage:null
            }  
        },
        created(){
            if(!this.me.myPreference){
                this.myPreference.favoriteCategories = [];
                this.myPreference.usuallyBuyClothesFor = [];
                this.myPreference.favoriteStyles = [];
                return;
            }

            let {favoriteCategories,usuallyBuyClothesFor,favoriteStyles} = JSON.parse(JSON.stringify(this.me.myPreference));

            this.myPreference.favoriteCategories = this.getDisposeArr(favoriteCategories);
            this.myPreference.usuallyBuyClothesFor = this.getDisposeArr(usuallyBuyClothesFor);
            this.myPreference.favoriteStyles = this.getDisposeArr(favoriteStyles);
        },
        methods:{
            getCategoryValue(value){
                this.myPreference.favoriteCategories = value;
            },
            getUsuallyValue(value){
                this.myPreference.usuallyBuyClothesFor = value;
            },
            getCategoryStylesValue(value){
                this.myPreference.favoriteStyles = value;
            },
            addPreference(){
                let _this = this;
                _this.isLoadingShow = true;
                let obj = {
                    customer:{
                        myPreference:{
                            "favoriteCategories":this.disposeCustomer(this.myPreference.favoriteCategories),
                            "usuallyBuyClothesFor":this.disposeCustomer(this.myPreference.usuallyBuyClothesFor),
                            "favoriteStyles":this.disposeCustomer(this.myPreference.favoriteStyles)
                        }
                    },
                    name:"myPreference",
                    definition:{myPreference:this.myPreference}

                };
                _this.$store.dispatch("me/updateCustomerSave",obj).then(result => {
                    _this.isLoadingShow = false;
                    // _this.$router.go(-1);
                    if(result?.prompt?.html){
                        this.reminderMessage =result.prompt.html;
                    }else{
                        this.$toast({
                            content:"Update success!",
                            type:"success",
                            timer:2000,
                            style1:{
                                backgroundColor:"#ffffff",
                                color:"#222222",
                                padding:"15px 10px",
                                borderRadius:"5px",
                                boxShadow: "0px 0px 4px 1px rgba(0, 0, 0, 0.2)",
                                bottom:"300px"
                            }
                        }).show();
                    }
                });
            },
            disposeCustomer(arr){
                if(arr && arr.length > 0){
                    return arr.map(item => item.value);
                }
                return [];
            },
            getDisposeArr(arr){
                return arr && arr.length > 0 ? arr : [];
            }
        },
        beforeRouteEnter(to, from, next){
            store.dispatch('me/getMyPreferenceMessageCode', "M1521").then(() => {
                next();
            }).catch((e) => {
                console.error(e)
                next(false)
            })
        },
    }
</script>

<style scoped lang="scss">
    .my-preference{
        padding-bottom: 20px;
    }

    .points-modal{
        .container{
            position: fixed;
            z-index: 11;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            width: 80%;
            background-color: #ffffff;
            padding: 20px 0px;
        }
    }
</style>