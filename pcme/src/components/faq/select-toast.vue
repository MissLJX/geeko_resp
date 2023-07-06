<template>
    <div class="selectToast">
        {{ message }}
    </div>
</template>

<script>
export default {
    props:{
        message:{
            type: String,
            default: ''
        },
        timeout:{
            type: Number,
            default: 3000
        }
    },
    data(){
        return {

        }
    },
    created(){
        setTimeout(() => {
            this.$emit("close")
        }, this.timeout)
    }
}
</script>

<style lang="scss" scoped>
.selectToast{
    position: fixed;
    top: 45%;
    right: 8%;
    width: 320px;
    min-height: 70px;
    padding: 30px 40px;
    border-radius: 7px;
    font-size: 12px;
    font-family: Roboto-Regular, Roboto;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 14px;
    text-align: center;
    z-index: 205;
    background: rgba(34,34,34,0.8);
}
</style>