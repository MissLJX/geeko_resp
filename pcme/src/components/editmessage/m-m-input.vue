<template>
    <!-- My Measurements 页面的输入框部分 -->
    <div class="my-measurements-input-box">
        <div :class="{'my-measurements-input-item':true, 'title-per':item.slotTitle == $t('measurements.mea_perference')}" v-for="(item,index) in slotList" :key="index">
            <div class="m-m-input-title ">{{item.slotTitle}}</div>
            <div class="m-m-input-part">
                <div class="m-m-input-input" v-for="(item1, index1) in item.slotList" :key="index1">
                    <input v-show="item1.slotType === 'input'" 
                           class="m-m-input-input-text" 
                           :type="item1.slotInputType" 
                           @input="input(item.slotTitle,item1.slotInputType,$event)"
                           :value="item1.slotDefaultV"
                           onkeyup="this.value=this.value.toUpperCase()"
                           >
                    <m-select v-show="item1.slotType === 'checkbox'" 
                              :checkList="item1.slotCheckList" 
                              :defaultValue="item1.slotDefaultV"
                              :fatherTitle="item.slotTitle"
                              @onchange="selectChange"                          
                              :size="item1.slotSize"
                              @selectchange="openSelect"
                              :whichSelectOpen="selectItem"
                              ></m-select>
                    <div v-show="item.slotTitle == $t('measurements.mea_perference')" class="radio-group" >
                         <label :for="item2" 
                                v-for="(item2, index2) in item1.slotCheckList" 
                                :key="index2"
                                @click="radioClick(item.slotTitle,item2)">
                             <div :class="{'radioBox':true,'radio-select':radioSelect == item2}" >
                                 <img src="https://s3.us-west-2.amazonaws.com/image.chic-fusion.com/chicme/2021-08-11/2021-08-11-select-radio.png" alt="">
                             </div>
                             <input type="radio" 
                                :id="item2"
                                :name="item.slotTitle"
                                :value="item2"
                                :checked="item1.slotDefaultV == item2"
                                />
                                {{item2}}
                         </label>
                         
                    </div>
                   
                    
                </div>
            </div>
        </div>
    </div>
</template>



<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex'
    import MMSelect from "./m-m-select.vue";
    export default {
        props: {
            title:{
                type: String,
                default: "",
                required: true
            },
            slotList: {
                type: Array,
                default: [],
                required: true
            },
            inputData: {
                type: Object,
                default: {}
            },
        },
        computed: {
        },
        data(){
            return{
                checkList: ["cm","inch"],
                selectSize: "primary",
                selectItem: "",
                radioSelect: "",
            }
        },
        mounted(){
            // console.log(this.slotList)
            console.log(this.inputData)
            console.log(this.inputData[this.$t("measurements.mea_perference")+""])
            this.radioSelect = this.inputData[this.$t("measurements.mea_perference")+""]['select']
        },
        methods:{
            selectChange(value, title){
                this.inputData[title]['select'] = value;
                this.$emit("onchange",this.inputData)
            },
            openSelect(title){
                if(this.selectItem == title){
                    this.selectItem = "";
                } else {
                    this.selectItem = title;
                }
            },
            input(value, type, e){
                // console.log(value, type, e.target.value)
                for(let item in this.inputData[value]){
                    if(item == type){
                        this.inputData[value][item] = e.target.value.toUpperCase()
                    }
                }
                this.$emit("onchange",this.inputData)
            },
            radioClick(title,value){
                this.radioSelect = value;
                this.inputData[title]['select'] = value;
                this.$emit("onchange",this.inputData)
            }
        },
        components:{
            "m-select": MMSelect
        }
    }
</script>

<style scoped lang="scss">
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
input[type=number]{
    -moz-appearance: textfield;
}
input[type=radio]{
    display: none;
}


.my-measurements-input-box{
    width: 100%;
    // border-bottom: 10px solid #f5f5f5;
    
    
    .my-measurements-input-item{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        // margin: 0 auto;
        height: 48px;
        line-height: 48px;


        & > .m-m-input-title{
            font-family: Roboto-Regular;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #000000;
            white-space: nowrap;
        }
        
        .m-m-input-part{
            display: flex;
            align-items: center;
            justify-content: space-around;
            width: 160px;
            border: 1px solid;
            height: 32px;
            overflow: hidden;

            .m-m-input-input{
                // min-width: 111px;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                display: inline-block;
                // width: 90%;

                & > .m-m-input-input-text{
                    width: 100%;
                    /* margin: 0 7.5px; */
                    border: none;
                    outline: none;
                    /* border-bottom: 1px solid rgba(34, 34, 34, 0.2); */
                    /* padding: 0 3px 5px; */
                    text-align: center;
                    font-family: Roboto-Medium;
                    font-size: 14px;
                    font-weight: 600;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #222222;
                    line-height: 28px;
                    // border: 1px solid;
                }
                & > .m-m-input-input-text:last-child{
                    margin-left: 15px;
                }
            }
        }
         
    }
    .my-measurements-input-item:last-child{
        border: none;
    }

    .title-per{
        display: block;
        // display: flex;
        // align-items: center;
        // justify-content: space-between;
        width: 92%;
        // margin: 0 auto;
        height: 48px;
        line-height: 48px;

        .m-m-input-title{
            font-family: Roboto-Regular;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #000000;
            white-space: nowrap;
            margin-top: 48px;
            font-weight: bold;
            font-size: 16px;
        }
        .m-m-input-part{
            display: block;
            border: none;
        }
        .radio-group{
            // border: 1px solid;
            width: 300px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-family: Roboto-Regular;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #222222;

            label{
                text-align: center;
                line-height: 30px;
                display: flex;
                align-items: center;

                .radioBox{
                    width: 18px;
                    height: 18px;
                    border: 1px solid #000000;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 8px;

                    & > img {
                       width:12px;
                       height: 10px;
                    }
                }
                .radio-select{
                    background: #000;
                }
            }
            
        }
        
    }
} 

    
</style>