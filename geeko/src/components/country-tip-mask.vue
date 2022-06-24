<template>
    <div class="mask">
        <div class="contentBox">
            <div class="tipContent">
                {{$t("message.please_sure_address_correct")}}
            </div>
            <div class="tipCountry">
                <div>{{streetAddress}}</div>
                <span>{{zipCode}},{{city}},{{stateLabel}},<span class="countryLabel">{{countryLabel}}</span></span>
            </div>
            <div class="tipButtonBox">
                <div class="tipButton whiteBtn" @click="()=>{closeMask()}">{{$t("message.modify")}}</div>
                <div class="tipButton" @click="()=>{goon()}">{{$t("message.confirm")}}</div>
            </div>
        </div>
    </div>
</template>

<script>
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

        .contentBox{
            width: 81%;
            padding: 20px 12px;
            background: #fff;
            border-radius: 2px;

            .tipContent{
                font-family: AcuminPro-Bold;
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #222222;
                // text-align: center;
                margin-bottom: 28px;
            }

            .tipCountry{
                font-size: 12px;
                font-family: Roboto;
                font-weight: 400;
                color: #222222;
                line-height: 14px;

                .countryLabel{
                    color:#E64545;
                }
            }

            .tipButtonBox{
                margin-top: 27px;
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
                font-size: 16px;
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