<template>
    <div :class="selectBoxClass" @click.stop="select">
        <span>{{value}}</span>
        <img class="m-m-select-icon" alt="" src="https://s3.us-west-2.amazonaws.com/image.chic-fusion.com/chicme/2021-08-11/2021-08-11-select-down-pc.png">
        <div :class="selectOptionBoxClass">
            <div :class="{'m-m-option':true, 'm-m-option-selected':selectItem == item}" 
                 v-for="(item) in checkList" 
                 :key="item" 
                 @click.stop="choose(item)">
                 {{item}}
            </div>
        </div>
    </div>
</template>



<script type="text/ecmascript-6">
    export default {
        props: {
            // 选项列表
            checkList: {
                type: Array,
                required: true,
                default: [],
            },
            // 默认值
            defaultValue: {
                type: String,
                default: ""
            },
            // primary：54px宽, large：填满父容器
            size: {
                type: String,
                default: "primary"
            },
            // 父数据的标题 或者是能够代表这个组件的无重复值
            fatherTitle:{
                type: String,
                default: ""
            },
            // 如果要保证当前页面所有使用m-select的地方同一时间最多只有一个为打开状态
            // 需在它们的共同父组件中（或者vuex）向m-select传入whichSelectOpen
            // 更新父组件的whichSelectOpen即可维护同一时刻最多只有一个为打开状态
            // 在m-select暴露的selectchange方法中可以获取获取当前打开的m-select的fatherTitle
            // 将父组件的whichSelectOpen赋值为这个fatherTitle即可            
            whichSelectOpen:{
                type: String,
                default: ""
            }
            
        },
        data(){
          return {
            // 展开下拉框
            isSelecting: false,
            // 下拉框选中项
            selectItem: '',
            // 显示的值
            value: "",
          }  
        },
        computed: {
            // 如果存在初始值显示初始值，如果没有初始值显示下拉列表第一项
            defaultV:{
                get:function(){
                    return this.defaultValue ? this.defaultValue : 
                           this.checkList.length > 0 ? this.checkList[0] : ""
                },
                set:function(state){
                    // console.log(state)
                    return state
                }
            },
            selectBoxClass:function(){
                return {
                    'm-m-select-box':true, 
                    'selected': this.isSelecting, 
                    'unselected': !this.isSelecting,
                    'large': this.size === "large"
                }
            },
            selectOptionBoxClass:function(){
                return {
                    'm-m-option-box':true, 
                    'showing': this.isSelecting, 
                    'hiding':!this.isSelecting
                }
            }, 
        },
        watch:{
            "whichSelectOpen":function(newValue, oldValue){
                if(newValue != this.fatherTitle){
                    this.isSelecting = false
                }
            },
            "defaultValue":function(newValue, oldValue){
                // console.log("DV===========",newValue)
                if(newValue){
                    this.selectItem = newValue
                    this.value = newValue
                }
            } 
        },
        created(){
            // 初始化选择
            this.value = this.defaultV;
            this.selectItem = this.value;
            // 点击其他区域关闭弹窗
            document.addEventListener("click",this.closeItem,false)
        },
        beforeDestroy(){
            // 页面销毁前移除监听
            document.removeEventListener("click",this.closeItem,false);
        },
        methods:{
            select(){
                this.isSelecting = !this.isSelecting;
                this.$emit("selectchange", this.fatherTitle)
            },
            // 在子组件上绑定onchange事件中可以获取到选中的值
            choose(item){
                // 切换选项
                this.selectItem = item;
                this.value = item;
                this.isSelecting = false;
                this.$emit("onchange", item, this.fatherTitle);
            },
            closeItem(e){
                if(!this.$el.contains(e.target)){
                    this.isSelecting = false;
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .m-m-select-box{
        width: 46px;
        height: 32px;
        line-height: 32px;
        /* border: solid 1px #f6f6f6; */
        font-family: SlatePro-Medium;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        background-color: #222200;
        /* border: solid 1px #222200; */
        color: #fff;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        padding: 0 5px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-right: -1px;
        cursor: pointer;

        & > span{
            white-space: nowrap;
            cursor: pointer;
        }

        .m-m-select-icon {
            width: 10px;
            height: 7px;
        }
        .m-m-option-box{
            position: absolute;
            top: 31px;
            left: -1px;
            z-index: 2;
            width: 46px;
            min-height: 25px;
            background-color: #f6f6f6;
            // border-radius: 2px;
            font-family: SlatePro-Medium;
            font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #222222;
            opacity: 0;
            border: solid 1px #222200;
        }
        .showing{
            opacity: 1;
            transition: all 0.3s;
        }
        .hiding{
            opacity: 0;
            display: none;
            transition: all 0.5s;
        }

        .m-m-option{
            font-family: SlatePro-Medium;
            font-size: 12px;
            font-weight: 600;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #999;
            padding: 0 5px;
            transition: all 0.2s;
            white-space: nowrap;
        }
        .m-m-option-selected{
            color:#222;
            transition: all 0.2s;
        }
    }
    .large{
        width: 100%;
        .m-m-option-box{
            width: 100%;
        }
    }
    .selected{
        .m-m-select-icon {
            width: 10px;
            height: 7px;
            transform: rotate(180deg);
            transition: all 0.3s;
        }
    }
    .unselected{
        .m-m-select-icon {
            width: 10px;
            height: 7px;
            transform: rotate(0deg);
            transition: all 0.3s;
        }
    }
    

    
</style>