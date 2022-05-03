<template>
    <div :class="{'selectBox':true,'radiusBox': isRadius}">
        <div :class="{'selectInputBox':true}" @click="selectOpen()">
            {{value}}
            <img :class="{'selectIcon':true,'selected':open}" src="https://image.geeko.ltd/site/pc/icon137.png" alt="" />
        </div>
        <transition name="selectOptionBox">
            <div class="selectOptionBox" v-if="open">
                <div class="selectOption" v-for="(item, index) in selectList" :key="index" @click="optionClick(item)">
                    {{item.label}}
                </div>
            </div>
        </transition>
        
    </div>
</template>

<script>
export default {
    props:{
        selectValue:{
            type:String,
            default: '',
            // required: true
        },
        selectList:{
            type: Array,
            default: [],
            required: true
        },
        isRadius:{
            type:Boolean,
            default:false
        },
        disabled:{
            type:Boolean,
            default:false
        },
        placeholder:{
            type:String,
            default:''
        }
    },
    data(){
        return {
            open: false,
            select: '',
        }
    },
    created() {
        document.addEventListener("click",this.closeItem,false)
    },
    beforeDestroy(){
        // 页面销毁前移除监听
        document.removeEventListener("click",this.closeItem,false);   
    },
    watch:{
       selectValue:function(oldValue,newValue){
        //    console.log("newValue",newValue,"oldValue",oldValue);
       }
    },
    computed:{
        value(){
            // console.log(this.selectValue)
            if(!this.selectList || this.selectList.length == 0){
                return this.placeholder ? this.placeholder: this.$t("support.s_select_ph")
            } else {
                if(this.selectValue){
                    let item = this.selectList.find(s => s.value == this.selectValue);
                    // console.log(item)
                    if(item){
                        return item.label
                    } else {
                        return this.placeholder ? this.placeholder: this.$t("support.s_select_ph")
                    }
                } else {
                    return this.placeholder ? this.placeholder: this.$t("support.s_select_ph")
                }
            }
            
        }
    },
    methods:{
        selectOpen(){
            // console.log(this.open)
            if(!this.disabled){
                this.open = !this.open
            }
        },
        optionClick(item){
            // console.log(item)
            this.$emit("selectChange",item)
            this.open = false
        },
        closeItem(e){
            if(!this.$el.contains(e.target)){
                this.open = false;
            }
        },
    }
}
</script>


<style lang="scss" scoped>
    .selectBox{
        position: relative;

        .selectInputBox{
            width: 100%;
            height: 38px;
            border-radius: 2px;
            border: solid 1px #cacaca;
            position: relative;
            -webkit-appearance: none; /*for chrome*/
            line-height: 38px;
            cursor: pointer;
            padding:0 10px;

            .selectIcon{
                position: absolute;
                right: 10px;
                top: calc(50% - 4px);
                width: 13px;
                height: 8px;
                transform: rotate(0);
                transition: all 0.2s linear;
            }
            .selected{
                transform: rotate(180deg);
                transition: all 0.2s linear;
            }
        }

        .selectOptionBox{
            background-color: #fff;
            position: absolute;
            top: 38px;
            // left: 4%;
            // width: 92%;
            width: 100%;
            min-height: 38px;
            line-height: 38px;
            border: 1px solid #cacaca;
            border-top: none;
            z-index: 1;

            .selectOption{
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                padding: 0 10px;
                cursor: pointer;
            }
        }
    }

    .radiusBox{
        .selectInputBox{
            border-radius: 19px;
            padding: 0 20px;

            .selectIcon{
                right: 20px;
            }
        }
        .selectOptionBox{
            background-color: #fff;
            position: absolute;
            top: 38px;
            width: 92%;
            min-height: 38px;
            line-height: 38px;
            border: 1px solid #cacaca;
            border-top: none;
            z-index: 1;
            margin: 0 4%;
        }
    }

    .selectOptionBox-enter-active,
    .selectOptionBox-leave-active{
        transition: all 0.5s ease;
    }
    .selectOptionBox-enter,
    .selectOptionBox-leave-to{
        opacity: 0;
        // max-height: 0;
    }
    
</style>