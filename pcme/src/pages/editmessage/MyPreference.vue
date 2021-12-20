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
            Save
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
                isLoadingShow:false
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
                _this.$store.dispatch("updateCustomerSave",obj).then(result => {
                    alert("Success!");
                    _this.isLoadingShow = false;
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