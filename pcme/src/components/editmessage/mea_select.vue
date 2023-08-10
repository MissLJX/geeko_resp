<template>
    <div class="mea_select_box" :style="pStyle">
        <div class="mea_select_title">{{ slotTitle }}</div>
        <template v-if="isEditing">
            <div class="mea_select" @click="() => openOptions()">
                <div class="mea_select_input">{{ inputLabel(slotDefaultV) }}</div>
                <div class="mea_select_options_box" v-show="showOptions">
                    <div :class="{'mea_select_option':true, 'mea_option_selected':!slotDefaultV}" @click="() => optionChange('')">{{ $t("measurements.mea_prefer_no_select") }}</div>
                    <div
                        v-for="(item, index) in selectList"
                        :key="item+index"
                        :class="{'mea_select_option':true, 'mea_option_selected':optionLabel(item) == slotDefaultV || inputLabel(slotDefaultV) == optionLabel(item)}"
                        @click="() => optionChange(item)"
                        >
                        {{ optionLabel(item) }}
                    </div>
                </div>
            </div>
            <div class="mea_unit_select" v-if="showUnitSelect">
                <div v-for="(item, index) in unitList" :class="{'mea_unit_item':true, 'mea_unit_selected': unit == item}" :key="index+unit" @click="() => unitChange(item)">{{ item }}</div>
            </div>
        </template>
        <template v-else>
            <div :class="{'mea_select_input': true, 'noEditing': !isEditing}">{{ noEditingLabel(slotDefaultV) }}</div>
        </template>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props:{
            unitList:{
                type: Array,
                default: () => []
            },
            unit:{
                type: String,
                default: ''
            },
            slotTitle:{
                type: String,
                default: ''
            },
            slotDefaultV:{
                default: ''
            },
            selectList:{
                type: Array,
                default: []
            },
            unitLabel:{
                type: String,
                default: ''
            },
            valueLabel:{
                type: String,
                default: ''
            },
            isEditing:{
                type: Boolean,
                default: false
            },
            pStyle: {
                type: String,
                default: ''
            }
        },
        data(){
            return {
                showOptions: false,
            }
        },
        computed:{
            showUnitSelect(){
                return this.unitList?.length > 0
            }
        },
        methods:{
            optionLabel(data){
                if(typeof(data) == 'object'){
                    return data?.[this.unit] + this.unit || ''
                }
                return data
            },
            optionChange(item){
                // console.log(item)
                if(typeof(item) == 'object'){
                    item?.[this.unit] && this.$emit("selectChange", this.valueLabel, item?.[this.unit])
                } else {
                    this.$emit("selectChange", this.valueLabel, item)
                }
            },
            openOptions(){
                this.showOptions = !this.showOptions
            },
            closeItem(e){
                if(!this.$el.contains(e.target)){
                    this.showOptions = false;
                }
            },
            unitChange(unit){
                // console.log(unit)
                this.$emit("selectChange", this.unitLabel, unit)
            },
            inputLabel(data){
                // console.log("inputLabel", data)
                // console.log(data, this.unit, this.selectList?.find(s => s == data || s?.[this.unit] == data), this.selectList?.find((s, i) => i == data), this.slotDefaultV)
                if( !data){
                    return this.$t("measurements.mea_prefer_no_select")
                } else if(this.selectList?.find(s => s == data || s?.[this.unit] == data)){
                    return data + this.unit
                } else if(this.selectList?.find(s => s == data + this.unit)){
                    return data + this.unit
                } else if(this.selectList?.find((s, i) => i == data) && this.valueLabel == "sizingRecommendation"){
                    const selectData = this.selectList?.find((s, i) => i == data)
                    return typeof(selectData) == 'object'?
                        (selectData?.[this.unit]? selectData?.[this.unit]+this.unit: this.$t("measurements.mea_prefer_no_select")):
                        selectData
                } else {
                    return this.$t("measurements.mea_prefer_no_select")
                }
            },
            noEditingLabel(data){
                // console.log('noEditingLabel',data, this.selectList)
                if(!data){
                    return '- -'
                } else if(this.selectList?.find(s => s == data || s == data + this.unit || s?.[this.unit] == data)){
                    let strReg = /[A-Za-z]/g //判断数据是否存在字母
                    return strReg.test(data)? data: data + ' ' + this.unit
                } else if(this.selectList?.find((s, i) => i == data) && this.valueLabel == "sizingRecommendation"){
                    return this.selectList?.find((s, i) => i == data) + ' ' + this.unit
                } else {
                    return '- -'
                }
            }
        },
        created(){
            // 初始化选择
            // this.value = this.defaultV;
            // this.selectItem = this.value;
            // 点击其他区域关闭弹窗
            document.addEventListener("click",this.closeItem,false)
        },
        beforeDestroy(){
            // 页面销毁前移除监听
            document.removeEventListener("click",this.closeItem,false);
        },
    }
</script>

<style scoped lang="scss">
.mea_select_box{
    width: 420px;
    // border: 1px solid;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    height: 40px;

    .mea_select_title{
        font-size: 14px;
        font-family: Roboto-Regular, Roboto;
        font-weight: 400;
        color: #000000;
        line-height: 16px;
        width: 130px;
    }

    .mea_select{
        cursor: pointer;
        flex: 1;
        position: relative;

        .mea_select_input{
            width: 100%;
            height: 40px;
            border: 1px solid #E5E5E5;
            line-height: 40px;
            padding: 0 10px;
            font-size: 12px;
            font-family: Roboto-Regular, Roboto;
            font-weight: 400;
            color: #222222;
            position: relative;

            &:after{
                content: '';
                display: inline-block;
                width: 8px;
                height: 8px;
                background: transparent;
                border-right: 2px solid #999;
                border-bottom: 2px solid #999;
                border-top: none;
                border-left: none;
                transform: rotate(45deg);
                display: inline-block;
                position: absolute;
                right: 12px;
                top: 13px;
            }

            &.noEditing{
                height: 40px;
                margin-bottom: 20px;
            }
        }

        .mea_select_options_box{
            position: absolute;
            top: 42px;
            left: 0;
            z-index: 2;
            width: 179px;
            min-height: 30px;
            max-height: 200px;
            overflow: auto;
            background: #FFFFFF;
            box-shadow: 0px 2px 5px 0px rgba(34,34,34,0.3);
            font-size: 12px;
            font-family: Roboto-Regular, Roboto;
            font-weight: 400;
            color: #222222;
            line-height: 14px;

            /*定义整体的宽度*/
            &::-webkit-scrollbar {
                width: 2px;
            }
            /*定义滚动条轨道*/
            &::-webkit-scrollbar-track {
                border-radius: 2px;
            }
            /*定义滑块*/
            &::-webkit-scrollbar-thumb {
                width: 2px;
                border-radius: 2px;
                background-color: #cccccc;
            }
            &::-webkit-scrollbar-thumb:hover{
                background-color: #999;
            }

            .mea_select_option{
                width: 100%;
                height: 38px;
                line-height: 38px;
                padding: 0 12px;

                &.mea_option_selected{
                    font-size: 12px;
                    font-family: Roboto-Bold, Roboto;
                    font-weight: bold;
                    color: #222222;
                    position: relative;

                    &:after{
                        content: '';
                        width: 5px;
                        height: 10px;
                        background: transparent;
                        border-right: 2px solid #222;
                        border-bottom: 2px solid #222;
                        border-top: none;
                        border-left: none;
                        transform: rotate(45deg);
                        display: inline-block;
                        position: absolute;
                        right: 12px;
                        top: 13px;
                    }
                }
            }
        }
    }

    .mea_unit_select{
        width: 116px;
        height: 40px;
        border: 1px solid #222;
        display: flex;
        align-items: center;
        overflow: hidden;

        .mea_unit_item{
            width: 50%;
            height: 100%;
            background: #fff;
            color: #222;
            text-align: center;
            line-height: 40px;
            cursor: pointer;

            &:first-child{
                border-right: 1px solid #222;
            }

            &.mea_unit_selected{
                background: #222;
                color: #fff;
            }
        }
    }
}
</style>