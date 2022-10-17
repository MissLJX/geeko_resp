<template>
<div>
    <!-- 不含积分的提示成功 -->
    <div class="success_box" v-if="type == 'no-points'">  
        <span class="iconfont success_icon">&#xe6b7;</span>
        {{content}}
    </div>

    <!-- 包含积分的提示成功 -->
    <div v-if="type == 'points'">
        <div class="tip_mask" @click.self="closeMask">
            <div class="tip_content">
                <div v-html="content">

                </div>
                <div class="points_btn_box">
                    <div class="points_btn" @click="closeMask">
                        {{$t("ok")}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  
</template>

<script>
export default {
    props:{
        content: {
            type: String,
            
        },
        type: {
            type: String,
            default: 'no-points'
        }
    },
    data(){
        return {

        }
    },
    mounted(){
        if(this.type == 'no-points'){
            setTimeout(()=>{
                this.closeMask();
            },2000)
        }
        !this.content && (this.content = this.$t("update_success")+'!')
    },
    methods:{
        toPointsPolicy(){
            window.location.href = "/policy/bonus-point"
        },
        closeMask(){
            this.$store.dispatch("setShowTip", false)
            this.$store.dispatch("setTipContent", "")
        }
    }
}
</script>

<style scoped>
    
    .success_box{
        width: 210px;
        height: 62px;
        background-color: #ffffff;
        box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.2);
        border-radius: 5px;
        border-radius: 5px;
        position: fixed;
        top: calc(50% - 31px);
        left: calc(50% - 105px);
        font-family: 'SLATEPRO';
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #222222;
        display: flex;
        align-items: center;
        justify-content: center;
        white-space: nowrap;
    }
    .success_icon{
        font-size: 21px;
        line-height: 21px;
        color: #20b759;
        margin-right: 7px;
    }
    .tip_mask{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: rgba(0,0,0,0.6);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .tip_content{
        width: 471px;
        min-height: 200px;
        background-color: #ffffff;
        padding: 18px 36px 30px;
        text-align: center;
    }
    .points_num{
        font-family: 'ACUMINPRO-BOLD';
        font-size: 24px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #222222;
    }
    .points_policy{
        font-family: 'SLATEPRO';
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 16px;
        letter-spacing: 0px;
        color: #222222;
        margin-bottom: 8px;
    }
    .points_icon{
        font-size: 12px !important;
        cursor: pointer;    
    }
    .points_content{
        font-family: 'SLATEPRO';
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #222222;
        margin-bottom: 20px;
    }
    .points_btn_box{
        margin-top: 30px;
    }
    .points_btn{
        height: 44px;
        background-color: #222222;
        border-radius: 2px;
        line-height: 44px;
        color: #fff;
        font-family: 'ACUMINPRO-BOLD';
        font-size: 20px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
        cursor: pointer;
    }
    .color_red{
        color:#e64545;
        font-family: 'ACUMINPRO-BOLD';
    }
</style>