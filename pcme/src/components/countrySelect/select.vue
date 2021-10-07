<template>
    <div class="selectBox">
        <div class="selectInputBox"  @click="openSelect()" >
            <span>{{defaultV}}</span>
            <div v-if="selectOpen == true" class="selectOptionBorderBox">
                <div class="searchBar">
                    <span class="iconfont">&#xe772;</span>
                    <input type="text" 
                           @input="searchChange($event)"
                           @click.stop="()=>{}"
                           placeholder="Country/Region"
                           >
                </div>
                <div class="selectOptionBox">
                    <!-- <div class='selectOption gray'>Country</div> -->
                    <div :class="{'selectOption': true, 'selectOption-select': defaultV == item.value}"
                        v-for="(item, index) in sameCountry" 
                        :key="index"  
                        :value="item.value"
                        @click="optionClick(item)"
                        >
                        <!-- {{item.label}} -->
                        <span v-html="item.labelS"></span>
                    </div>
                </div>
            </div>
        </div>
        
        <span :class="{'iconfont selectIcon': true, 'option-open': selectOpen}">&#xe692;</span>
    </div>
</template>

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
    .selectBox{
        min-width: 351px;
        max-width: 500px;
        position: relative;
        .selectInputBox {
            width: 100%;
            height: 32px;
            background-color: #f6f6f6;
            border: none;
            outline: none;
            line-height: 32px;
            // padding: 0 10px;
            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            cursor: pointer;
            text-align: left;

            span{
                padding: 15px;
            }
            .selectOptionBorderBox{
                position: absolute;
                top: 32px;
                width: calc(100% - 0px);
                max-height: 260px;
                // position: relative;
                border: 1px solid #efefef;
                padding-bottom: 15px;
                z-index: 20;
                background: #fff;

                .searchBar{
                    width: 95%;
                    border-bottom: 1px solid #eee;
                    margin: 0 auto;
                    margin-top: 8px;
                    span{
                        padding: 0 5px;
                        font-size: 13px;
                        line-height: 13px;
                    }

                    input{
                        width: calc(100% - 40px);
                        border: none;
                        outline: none;
                        line-height: 26px;
                        color: #222;
                    }
                    input::-webkit-input-placeholder{
                        color: #999;
                    }
                }
            }
            .selectOptionBox{
                margin-top: 10px;
                background-color: #fff;
                width: 97%;
                max-height: 200px;
                overflow: hidden;
                overflow-y: scroll;
                z-index: 1;
                
                .selectOption{
                    padding: 0 15px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 27px;
                    letter-spacing: 0px;
                    color: #222222;
                    
                    span{
                        padding: 0;
                    }       
                }

                .selectOption-select{
                    background: #fff;
                }

                .gray{
                    color: #aaa;
                }
            }
            .selectOptionBox::-webkit-scrollbar{
                width: 4px;
                border-radius: 2px;
                background-color: #efefef;
                margin-right: 4px;
            }
            .selectOptionBox::-webkit-scrollbar-thumb{
                background-color: #888;
                border-radius: 2px;
            }
        }
        .selectIcon{
            position: absolute;
            right: 10px;
            top: calc(50% - 9px);
            transition: all 0.3s linear;
            color: #cacaca;
            cursor: pointer;
        }
        .option-open{
            transform: rotate(180deg);
            transition: all 0.3s linear;
        }
    }
</style>


<script>
export default {
    props:{
        defaultV:{
            type: String,
            required: true,
            default: 'Germany'
        },
        countries:{
            type: Array,
            default:[]
        }
    },
    data(){
        return{
            selectedValue: 'Country',
            selectOpen: false,
            // countries:[
            //     {label: "United States", value: "US"},
            //     {label: "Canada", value: "CA"},
            //     {label: "United Kingdom", value: "GB"},
            //     {label: "France", value: "FR"},
            //     {label: "Germany", value: "DE"},
            //     {label: "Albania", value: "AL"},
            //     {label: "Algeria", value: "DZ"},
            //     {label: "Andorra", value: "AD"},
            // ],
            searchValue:''
        }
    },
    created() {
        // console.log(this.defaultV)
        document.addEventListener("click",this.closeItem,false)
    },
    beforeDestroy(){
        if(this.type == 'select'){
            // 页面销毁前移除监听
            document.removeEventListener("click",this.closeItem,false);   
        }
    },
    computed:{
        sameCountry(){
            let includeCountry = this.countries;
            if(this.searchValue){
                let reg = new RegExp(this.searchValue+'', 'ig')
                includeCountry = this.countries.filter(c => {
                    return reg.test(c.label)
                })
                // let reg = new RegExp(''+this.state.searchValue+'', "ig");
            // return title.replace(reg, (e)=>{return '<strong>'+e+"</strong>"})
                // includeCountry.foreach((item)=>{
                //     item.label.replace(reg, (e)=>{
                //         return '<strong>'+e+'</strong>'
                //     })
                // })
                includeCountry.forEach((item)=>{
                    // console.log(item)
                    item.labelS = item.label.replace(reg, (e)=>{
                        console.log(e)
                        return '<span style="color:#999;padding:0;">'+e+'</span>'
                    })
                    console.log(item.label)
                })
                console.log(includeCountry[0])
                return includeCountry
            } else {
                includeCountry.forEach(item => {
                    item.labelS = item.label
                })
                return includeCountry
            }
            
        }
    },
    watch:{
        // defaultV(newV, oldV){
        //     console.log(newV)
        //     console.log(oldV)
        // }
    },
    methods: {
        openSelect(){
            // console.log('click')
            this.selectOpen = !this.selectOpen;
            this.searchValue = ''
        },
        optionClick(e){
            // console.log(e)
            this.selectedValue = e.label;
            this.$emit("optionClick", e)
        },
        searchChange(e){
            // console.log(e.target.value)
            this.searchValue = e.target.value;
        },
        closeItem(e){
            if(!this.$el.contains(e.target)){
                this.selectOpen = false;
            }
        },
    },
}
</script>