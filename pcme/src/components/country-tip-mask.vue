<template>
    <div class="mask">
        <div class="contentBoxPc">
            <div class="tipContentPc">
                {{$t("please_sure_address_correct")}}
            </div>
            <div class="tipCountryPc">
                <div>{{streetAddress}}</div>
                <span>{{zipCode}},{{city}},{{stateLabel}},<span class="countryLabel">{{countryLabel}}</span></span>
            </div>
            <div class="tipButtonBox tipButtonBoxPc">
                <div class="tipButton tipButtonPc whiteBtn" @click="()=>{closeMask()}">{{$t("modify")}}</div>
                <div class="tipButton tipButtonPc" @click="()=>{goon()}">{{$t("confirm")}}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
 export default {
        data(){
            return {
            }
        },
        props:{
            streetAddress:{
                type:String,
                default: ''
            },
            zipCode:{
                type:String,
                default: ''
            },
            city:{
                type:String,
                default: ''
            },
            stateLabel:{
                type:String,
                default: ''
            },
            countryLabel:{
                type:String,
                default: ''
            },
        },
        methods:{
            closeMask(){
                this.$emit("closeMask")
            },
            goon(){
                this.$emit("goon")
            }
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
        text-align: left;
        overflow-y: auto;
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;

        .contentBoxPc{
            width: 461px;
            background-color: #ffffff;
            border-radius: 3px;
            padding: 22px 18px;

            .tipContentPc{
                font-size: 18px;
                font-family: AcuminPro-Bold, Roboto;
                font-weight: bold;
                color: #222222;
                line-height: 21px;
                margin-bottom: 43px;
            }

            .tipCountryPc{
                font-size: 16px;
                font-family: Roboto;
                font-weight: 400;
                color: #222222;
                line-height: 19px;

                .countryLabel{
                    color:#E64545;
                }
            }

            .tipButtonBoxPc{
                margin-top: 38px;
            }

            .tipButton{
                width: 100%;
                height: 42px;
                line-height: 42px;
                background-color: #222;
                border-radius: 2px;
                border: solid 1px #222222;
                text-align: center;
                font-family: AcuminPro-Bold;
                font-size: 18px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #fff;
                text-transform: uppercase;
                margin-top: 12px;
                cursor: pointer;
            }

            .whiteBtn{
                background-color: #fff;
                color: #222;
            }
        }
    }
</style>