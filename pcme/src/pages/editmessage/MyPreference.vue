<template>
    <div class="my-preference">
        <div class="_hd">
            {{$t("index.my_preference")}}
        </div>

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

        <div class="footer-btn" @click="addPreference">
            {{$t("save")}}
        </div>

        <loading v-if="isLoadingShow"></loading>
    </div>
</template>

<script>
    import MyPreferenceItem from "../../components/editmessage/MyPreferenceItem.vue"

    import store from "../../store/index.js"
    import loding from "../../components/loding.vue"

    import { mapGetters } from "vuex"

    export default {
        name:"MyPreference",
        components:{
            "my-preference-item":MyPreferenceItem,
            "loading":loding
        },
        computed:{
            ...mapGetters(["me","messageM1521"])
        },
        data(){
          return {
                myPreference:{
                    favoriteCategories:[],
                    usuallyBuyClothesFor:[],
                    favoriteStyles:[]
                },
                isLoadingShow:false,
                haveDoneBefore: false,
                tipContent: ''
            }  
        },
        created(){
            this.tipContent = "<div style='text-align: center;'><img src='https://image.geeko.ltd/chicme/2021111101/modal_points.png' alt='ModalPoints' style='width:50%;'><p style='font-weight:bold;font-size:24px;margin: 0;'>100 Points</p><p style='margin: 0;font-size: 12px;'><span>100 points = $1 USD.</span><a href='/fs/points-policy-pc' style='vertical-align: middle;'><img src='https://image.geeko.ltd/chicme/2021111101/question.png' alt='Question' style='width: 14px;height: 14px;'></a></p><p style='margin: 0;font-size: 12px;line-height: 12px;margin-top: 10px;font-family: Roboto-Regular'>Saved Successfully!</p><p style='margin: 0;font-size: 12px;font-family: Roboto-Regular;'>You’ve got <span style='color: #e64545;font-weight: bold;font-family: Roboto-Regular;'>100 points</span> in your account</p></div>"
            if(!this.me.myPreference){
                this.haveDoneBefore = false
                this.myPreference.favoriteCategories = [];
                this.myPreference.usuallyBuyClothesFor = [];
                this.myPreference.favoriteStyles = [];
                return;
            } else {
                this.haveDoneBefore = true
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

                if(this.myPreference.favoriteCategories.length <= 0 && this.myPreference.usuallyBuyClothesFor.length <= 0 && this.myPreference.favoriteStyles.length <= 0){
                    alert(_this.$t('label.my_preference_error_message'));
                    return;
                }


                this.isLoadingShow = true;
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
                this.$store.dispatch("updateCustomerSave",obj).then(result => {
                    // alert("Success!");
                    this.isLoadingShow = false;
                    if(this.haveDoneBefore){
                        this.showNormalTip()
                    } else {
                        if(result.prompt && result.prompt.html){
                            let policyUrl = /(\/fs\/points-policy)/
                            let text = result.prompt.html.indexOf('/fs/points-policy') != -1 ? result.prompt.html.replace(policyUrl, '/fs/points-policy-pc'): result.prompt.html
                            this.tipContent = text
                        }
                        this.showPointsTip()
                        this.haveDoneBefore = true
                    }
                })
            },
            showNormalTip(){
                this.$store.dispatch("setTipContent", this.$t("update_success"));
                this.$store.dispatch("setShowTip", true);
                this.$store.dispatch("setTipType", '');
            },
            showPointsTip(){
                this.$store.dispatch("setTipContent", this.tipContent);
                this.$store.dispatch("setShowTip", true);
                this.$store.dispatch("setTipType", 'points');
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
            store.dispatch('getMyPreferenceMessageCode', "M1521").then(() => {
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

        ._hd{
            font-size: 24px;
            color: #222222;
            font-family: 'AcuminPro-Bold';
            text-align: center;
        }

        .footer-btn{
            width: 300px;
            background-color: #222222;
            padding: 10px 0px;
            font-size: 18px;
            color: #ffffff;
            font-family: 'AcuminPro-Bold';
            text-align: center;
            margin-top: 60px;
            cursor: pointer;
        }
    }
</style>