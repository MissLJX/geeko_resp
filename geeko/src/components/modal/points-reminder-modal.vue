<template>
    <div class="points-reminder-moal">
        <div class="modal-container">
            <div class="container">
                <div v-html="reminderMessage"></div>

                <btn class="fill btn normal" style="font-family: 'AcuminPro-Bold';" @click.native="closeEvent">{{$t('label.ok')}}</btn>
            </div>
        </div>
        
        <mask-model @click.native="closeEvent" />
    </div>
</template>

<script>
    import MaskComponent from "../Mask-component.vue"
    import Btn from "../btn.vue"

    export default {
        name:"PointsReminderModal",
        props:{
            reminderMessage:{
                type:String,
                default:"111111111"
            }
        },
        components:{
            "mask-model":MaskComponent,
            "btn":Btn
        },
        methods:{
            closeEvent:function(){
                this.$emit("onClose");
            }
        }
    }
</script>

<style scoped lang="scss">
    .modal-container{
        position: fixed;
        z-index: 11;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        width: 80%;
        background-color: #ffffff;

        .container{
            padding: 20px 0px;
        }
    }
</style>