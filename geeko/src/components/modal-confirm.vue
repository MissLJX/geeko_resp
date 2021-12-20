<template>
    <div class="st-confirm" :style="boxStyle">
        <span class="iconfont close" 
              :style="btnCloseStyle" 
              v-if="cfg.btnClose" 
              @click="cfg.no">&#xe69a;</span>

        <div class="bd"
             :style="messageStyle">
            <p>{{cfg.message}}</p>
        </div>

        <div class="message2" 
             v-if="cfg.message2"
             :style="message2Style">
            <p>{{cfg.message2}}</p>
        </div>

        <div class="fd">
            <button class="btn" 
                    @click="cfg.yes" 
                    v-if="cfg.btnFont && cfg.btnFont.yes"
                    :style="btnYes"
                    >{{cfg.btnFont.yes}}</button>
            <button class="btn no" 
                    @click="cfg.no" 
                    v-if="cfg.btnFont && cfg.btnFont.no"
                    :style="btnNo"
                    >{{cfg.btnFont.no}}</button>
        </div>
    </div>
</template>

<style>
    .st-confirm {
        position: fixed;
        width: 80%;
        max-width: 320px;
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
        top: 3px;
        right: 2px;
        font-size: 10px;
        line-height: 12px;
        color: #999;
        transform: scale(0.83);
    }

    .st-confirm > .fd{
        margin-top: 20px;
    }

    .st-confirm > .fd > .btn{
        height: 32px;
        background-color: #222222;
        line-height: 32px;
        color: #ffffff;
        width: 100%;
        border: none;
        cursor: pointer;
    }

    .st-confirm > .fd > .btn.no{
        margin-top: 10px;
        border: solid 1px #222222;
        color: #222222;
        background-color: #ffffff;
    }

    .st-confirm .message2{
        margin-top: 5px;
        color: #999999;
        font-size: 12px;
        text-align: center;
    }
</style>



<script type="text/ecmascript-6">
    export default{
        props: [
            'cfg'
            /**
             * 新cfg例子
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
            console.log(this.cfg)
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
            }
        },
        methods:{
            // 驼峰转换-
            toLine(key) {
                return key.replace(/([A-Z])/g,"-$1").toLowerCase();
            },
            // 自定义样式转成行内样式
            styleTransform(key){
                let style = this.cfg.style[key + ''];
                let keyStyle=''
                Object.keys(style).forEach((key1)=>{
                    keyStyle += this.toLine(key1) + ":" + style[key1+''] + ";"
                })
                console.log(keyStyle)
                return keyStyle;
            }
        }
    }
</script>