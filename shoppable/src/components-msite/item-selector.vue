<template>
    <div class="c-item-selector" @click="handleSizeColor">
        <span>{{sizecolor}}</span>
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
        width: 184px;
        height: 42px;
        line-height: 42px;
        cursor: pointer;
        color:#666;
        font-size: 22px;
        border: 1px solid #e3e3e3;
        margin-bottom: 40px;
        position: relative;
        span{
            margin-left: 10px;
        }
        &::after {
            content: '\e692';
            font-family: 'iconfont';
            position: absolute;
            right: 10px;
        }
    }
</style>