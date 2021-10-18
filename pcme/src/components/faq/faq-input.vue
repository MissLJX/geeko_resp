<template>
    <div class="inputBox">
        <input type="text" 
               class="inputBoxInput" 
               :value="inputValue"
               @input="inputChange($event)" 
               @focus="showClear=true" 
               @blur="inputBlur()"
               :placeholder="placeHolder"
               >
        <span v-if="showClear" class="iconfont clearIcon" @click="inputClear()">&#xe7c5;</span>
        <div class="searchIconBox">
            <span class="iconfont searchIcon" @click="inputSearch()">&#xe61e;</span>
        </div>
        <transition name="searchTipsBox">
            <div v-if="showClear" class="searchTipsBox">
                <div :title="item.title" :class="{'searchTipItem':true}" 
                    v-for="(item, index) in searchList" 
                    :key="index"
                    @click="serachItemClick(item)"
                    v-html="regTxt(item.title)"
                    >
                </div>
            </div>
        </transition>
        
    </div>
</template>

<script>
export default {
    props:{
        inputValue:{
            type: String,
            default:''
        },
        searchList:{
            type:Array,
            default:[]
        },
        placeHolder:{
            type:String,
            default: 'Popular Searches:Refund,Return,Shipping'
        }
    },
    data(){
        return{
            showClear: false,
        }
    },
    created() {
    },
    beforeDestroy(){
    },
    computed:{
    },
    watch:{
    },
    methods: {
        inputChange(e){
            // 修改父组件的值
            this.$emit("inputChange", e.target.value)
        },
        serachItemClick(e){
            console.log(e)
            this.$emit("relatedSearch",e.id)
        },
        inputSearch(){
            if(this.inputValue){
                this.$emit("inputSearch")
            }
        },
        inputBlur(){
            setTimeout(()=>{
                this.showClear = false
            },100)
        },
        inputClear(){
            this.$emit("inputChange", '')
        },
        regTxt(txt){
            let reg = new RegExp(''+this.inputValue+'', "ig")
            if(this.inputValue){
                txt = txt.replace(reg, (e)=>{return '<strong>'+e+"</strong>"})
                // console.log(txt)
                if(txt.indexOf('<strong>')!=-1){
                    return txt
                }
            } else {
                return txt
            }
        }
    },
}
</script>

<style scoped lang="scss">
    @font-face {
        font-family: 'iconfont';  /* Project id 384296 */
        src: url('//at.alicdn.com/t/font_384296_ejhfebx06om.woff2?t=1632376366417') format('woff2'),
            url('//at.alicdn.com/t/font_384296_ejhfebx06om.woff?t=1632376366417') format('woff'),
            url('//at.alicdn.com/t/font_384296_ejhfebx06om.ttf?t=1632376366417') format('truetype');
        }
    .iconfont{
        font-family:"iconfont" !important;
        font-size:16px;font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
    }
    .inputBox{
        width: 100%;
        height: 38px;
        border: 1px solid #cacaca;
        background-color: #fff;
        display: flex;
        align-items: center;
        position: relative;

        .inputBoxInput{
            border: none;
            outline: none;
            flex: 1;
            padding-left: 10px;
            line-height: 16px;
            font-family: SlatePro-Regular;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #222222;

            &::-webkit-input-placeholder{
                font-family: SlatePro-Regular;
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #999999;
            }
        }

        .clearIcon{
            // display: none;
            color: rgba(34, 34, 34, 0.3);
            cursor: pointer;
        }

        .searchIconBox{
            width: 56px;
            height: 38px;
            display: flex;
            align-items: center;
            justify-content: center;

            .searchIcon{
                font-size: 17px;
                line-height: 17px;
                color: #999;
                cursor: pointer;
            }
        }

        .searchTipsBox{
            position: absolute;
            top: 37px;
            left: 0;
            width: 100%;
            max-height: 175px;
            overflow: auto;
            overflow-x: hidden;
            border: 1px solid #e6e6e6;
            padding-top: 15px;
            z-index: 1;
            background-color: #fff;

            .searchTipItem{
                width: 100%;
                // margin: 15px 15px 2px;
                padding: 0 15px;
                line-height: 32px;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-family: Roboto-Regular;
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #666666;
                overflow: hidden;
                cursor: pointer;

                &:hover{
                    background-color: #f6f6f6;
                }
            }


            .searchTipItemSelect{
                background-color: #f6f6f6;
            }
        }

        .searchTipsBox::-webkit-scrollbar{
            width: 4px;
            border-radius: 2px;
            // background-color: #efefef;
            margin-right: 4px;
        }

        .searchTipsBox::-webkit-scrollbar-thumb{
            background-color: #888;
            border-radius: 2px;
        }

        .searchTipsBox-enter-active,
        .searchTipsBox-leave-active{
            transition: all 0.5s ease;
        }
        .searchTipsBox-enter,
        .searchTipsBox-leave-to{
            opacity: 0;
            max-height: 0;
        }
    }
                
</style>