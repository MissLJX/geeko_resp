<template>
    <div class="st-confirm" :style="boxStyle">
        <span class="iconfont close" 
              :style="btnCloseStyle" 
              v-if="cfg.btnClose" 
              @click="cfg.close">&#xe69a;</span>

        <span v-if="cfg.showSuccessIcon" class="iconfont success_icon" :style="iconStyle">&#xe6b7;</span>

        <div class="bd" v-if="cfg.message">
            <p :style="messageStyle">{{cfg.message}}</p>
        </div>

        <template>
            <div class="message2" 
                v-if="cfg.message2 && cfg.htmlMessage2"
                :style="message2Style">
                <p v-html="cfg.message2"></p>
            </div>

            <div class="message2" 
                v-else
                :style="message2Style">
                <p>{{cfg.message2}}</p>
            </div>
        </template>

        <div class="fd">
            
            <template v-if="isButtonList">
                <button :class="{'l-vue-btn':true, 'no':item.type=='no'}" 
                    @click="item.fuc || cfg.no" 
                    :style="styleTransform(item.style)"
                    v-for="item in cfg.btnFont"
                    :key="item"
                    >{{item.text}}</button>
            </template>
            
            <button class="l-vue-btn yes" 
                    v-if="!isButtonList && cfg.btnFont && cfg.btnFont.yes"
                    @click="cfg.yes" 
                    :style="btnYes"
                    >{{cfg.btnFont.yes}}</button>
            <button class="l-vue-btn no" 
                    v-if="!isButtonList && cfg.btnFont && cfg.btnFont.no"
                    @click="cfg.no" 
                    :style="btnNo"
                    >{{cfg.btnFont.no}}</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .st-confirm {
        position: fixed;
        /* width: 80%; */
        width: 600px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        box-shadow: #dcdcdc 1px 1px 2px;
        z-index: 201;
        border-radius: 4px;
        padding: 25px;
    }

    .st-confirm > .hd > h3{
        font-size: 16px;
        font-weight: 600;
        line-height: 40px;
        padding: 0 10px;
    }

    .st-confirm > .bd p{
        font-family: 'SlatePro-Medium';
        font-size: 14px;
        line-height: 17px;
        color: #222222;
        text-align: center;
    }

    .st-confirm > .close{
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 14px;
        line-height: 12px;
        color: #999;
        cursor: pointer;
        /* transform: scale(0.83); */
    }

    .st-confirm > .fd{
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .st-confirm > .fd > .l-vue-btn{
        height: 36px;
        background:#222222;
        background-color: #222222;
        line-height: 36px;
        color: #ffffff;
        /* width: 100%; */
        border: none;
        cursor: pointer;
        font-size: 14px;
        margin: 0 10px;
        padding: 0 10px;
        min-width: 160px;
    }

    .st-confirm > .fd > .l-vue-btn.no{
        /* margin-top: 10px; */
        border: solid 1px #222222;
        color: #222222;
        background: #ffffff;
        background-color: #ffffff;
    }

    .st-confirm .message2{
        margin-top: 5px;
        color: #999999;
        font-size: 12px;
        text-align: center;
    }

    .st-confirm .message2 p{
        line-height: normal;
    }

    .success_icon{
        font-size: 40px !important;
        line-height: 40px;
        color: #20b759;
        margin-bottom: 10px;
        text-align: center;
        display: block;
    }
</style>



<script type="text/ecmascript-6">
    export default{
        props: [
            'cfg'
            /**
             * 新cfg例子
             * 
             * cfg: {
                    btnFont:{
                        yes:"OK",
                    },
                    btnClose: true,
                    message: message,
                    message2:message2,
                    yes: function () {
                        _this.$store.dispatch('closeConfirm').then(() => {
                            if(callback) callback();
                        });
                    },
                    no: function () {
                        _this.$store.dispatch('closeConfirm');
                    },
                    style:{
                        box:{
                            width: '250px',
                            borderRadius: '2px',
                            padding: '26px 25px'
                        },
                        icon:{

                        },
                        message:{

                        },
                        message2:{

                        },
                        btnClose:{

                        },
                        btnYes:{

                        },
                        btnNo:{
                            
                        }
                    }
             */
        ],
        mounted(){
            // console.log(this.cfg)
        },
        computed:{
            boxStyle(){
                if(this.cfg.style && this.cfg.style.box && JSON.stringify(this.cfg.style.box)!='{}') {
                    return this.styleTransform('box');
                }
            },
            btnCloseStyle(){
                if(this.cfg.style && this.cfg.style.btnClose && JSON.stringify(this.cfg.style.btnClose)!='{}') {
                    return this.styleTransform('btnClose');
                }
            },
            iconStyle(){
                if(this.cfg.style && this.cfg.style.icon && JSON.stringify(this.cfg.style.icon)!='{}') {
                    return this.styleTransform('icon');
                }
            },
            messageStyle(){
                if(this.cfg.style && this.cfg.style.message && JSON.stringify(this.cfg.style.message)!='{}') {
                    return this.styleTransform('message');
                }
            },
            message2Style(){
                if(this.cfg.style && this.cfg.style.message2 && JSON.stringify(this.cfg.style.message2)!='{}') {
                    return this.styleTransform('message2');
                }
            },
            btnYes(){
                if(this.cfg.style && this.cfg.style.btnYes && JSON.stringify(this.cfg.style.btnYes)!='{}') {
                    return this.styleTransform('btnYes');
                }
            },
            btnNo(){
                if(this.cfg.style && this.cfg.style.btnNo && JSON.stringify(this.cfg.style.btnNo)!='{}') {
                    return this.styleTransform('btnNo');
                }
            },
            isButtonList(){
                return Object.prototype.toString.call(this.cfg.btnFont) == '[object Array]' ? true : false
            }
        },
        methods:{
            // 驼峰转换-
            toLine(key) {
                return key.replace(/([A-Z])/g,"-$1").toLowerCase();
            },
            // 自定义样式转成行内样式
            styleTransform(key){
                if(!key){return}
                let style;
                if(typeof key == 'object'){
                    style = key;
                } else {
                    style = this.cfg.style[key + ''];
                }
                let keyStyle=''
                // console.log(key,style)
                Object.keys(style).forEach((key1)=>{
                    keyStyle += this.toLine(key1) + ":" + style[key1+''] + ";"
                })
                // console.log(keyStyle)
                return keyStyle;
            }
        }
    }
</script>