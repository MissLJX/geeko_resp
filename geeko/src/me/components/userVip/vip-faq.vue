<template>
    <div class="vip-faq">
        <div class="faq-hd">
            <div class="faq-divide"></div>
            <div class="faq-title">FAQS</div>
            <div class="faq-divide"></div>
        </div>

        <ul>
            <template v-for="(faq,index) in faqs">
                <vip-faq-items :item="faq" :key="index"></vip-faq-items>
            </template>
        </ul>
    </div>
</template>

<script>
    import VipFaqItems from './vip-faq-items.vue'

    export default {
        name:"VipFaq",
        data(){
            return {
                dataArr:[
                    {
                        title:'11111',
                        content:"222222"
                    },
                    {
                        title:'33333',
                        content:"44444"
                    },
                    {
                        title:'555555',
                        content:"666666"
                    }
                ]
            }
        },
        props:{
            faqs:{
                type:Array,
                required:true,
                default:function(){
                    return {}
                }
            }
        },
        components:{
            VipFaqItems
        }
    }
</script>

<style scoped lang="scss">
    .vip-faq{
        margin-top: 30px;
        padding: 0px 12px;

        .faq-hd{
            display: flex;
            justify-content: space-between;
            align-items: center;

            .faq-divide{
                height: 1px;
                width: calc(50% - 25px);
                display: inline-block;
                position: relative;
                border-top: 1px solid #222222;
            }

            .faq-title{
                font-size: 16px;
                color: #222222;
                font-family: 'AcuminPro-Bold';
            }
        }
    }
</style>