<template>
    <!-- My Measurements 页面的输入框部分 -->
    <div class="my-measurements-input-box">
        <div class="my-measurements-input-item" v-for="(item,index) in slotList" :key="index">
            <div class="m-m-input-title">{{item.slotTitle}}</div>
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
            }
        },
        mounted(){
            // console.log(this.slotList)
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
            }
        },
        components:{
            "m-select": MMSelect
        }
    }
</script>

<style scoped lang="scss">
.my-measurements-input-box{
    width: 100%;
    border-bottom: 10px solid #f5f5f5;
    
    .my-measurements-input-item{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 92%;
        margin: 0 auto;
        height: 48px;
        line-height: 48px;

        & > .m-m-input-title{
            font-family: Roboto-Regular;
            font-size: 14px;
            font-weight: 600;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #000000;
            white-space: nowrap;
        }
        .m-m-input-part{
            display: flex;
            align-items: center;
            justify-content: space-around;
            width: 120px;
            .m-m-input-input{
                // min-width: 111px;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                display: inline-block;
                width: 90%;

                & > .m-m-input-input-text{
                    width: 39px;
                    margin: 0 7.5px;
                    border: none;
                    outline: none;
                    border-bottom: 1px solid rgba(34,34,34,0.2);
                    padding: 0 3px 5px;
                    text-align: center;
                    font-family: Roboto-Medium;
                    font-size: 14px;
                    font-weight: 600;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #222222;
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
} 

    
</style>