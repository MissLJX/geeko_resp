<template>
    <div class="c-item-selector" @click="handleSizeColor">
        <div class="p_des">
            <span>{{sizecolor}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "item-selector",
        props: ['variant'],
        computed: {
            sizecolor: function(){
                if(this.variant.size && this.variant.color){
                    return `${this.variant.size} + ${this.variant.color}`;
                }else if (this.variant.size==null){
                    return `${this.variant.color}`;
                }else if (this.variant.color){
                    return `${this.variant.size}`;
                }

            }
        },
        methods: {
            handleSizeColor(){
                this.$emit('size-color-select', this.variant)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @font-face {
        font-family: 'iconfont';  /* project id 384296 */
        src: url('//at.alicdn.com/t/font_384296_bl0c0weph0cf2yb9.eot');
        src: url('//at.alicdn.com/t/font_384296_bl0c0weph0cf2yb9.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_384296_bl0c0weph0cf2yb9.woff') format('woff'),
        url('//at.alicdn.com/t/font_384296_bl0c0weph0cf2yb9.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_384296_bl0c0weph0cf2yb9.svg#iconfont') format('svg');
    }
    .c-item-selector{
        width: 94%;
        height: 21px;
        line-height: 21px;
        cursor: pointer;
        color:#666;
        font-size: 11px;
        border: 1px solid #e3e3e3;
        margin-bottom: 20px;
        position: relative;
        .p_des{
            width: 80%;
            white-space:nowrap;
            text-overflow:ellipsis;
            overflow:hidden;
            span{
                margin-left: 10px;
            }
        }
        &::after {
            content: '\e692';
            font-family: 'iconfont';
            position: absolute;
            top: 0px;
            right: 3px;
        }
    }
</style>