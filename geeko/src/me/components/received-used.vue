<template>
    <div class="content">
        <div class="received" @click="changeMethod(true)" v-bind:class="{ active: isActive }">Received</div>
        <div class="used" @click="changeMethod(false)" v-bind:class="{ active: !isActive }">Used</div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                isActive:true
            }
        },
        methods:{
            changeMethod:function(hasUsed){
                this.isActive = !this.isActive
                this.$emit('showUsed',hasUsed)
            }
        }
    }
</script>

<style scoped type="scss">
    .content{
        width: 300px;
        margin: 0 auto;display: table;
        text-align: center;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        border: 1px solid #cacaca;
        border-radius: 4px;
        margin-bottom: 10px;
        div{
            display: table-cell;
            width: 50%;
        }
        .received{
            text-align: center;
            border-radius:4px 0 0 4px;
            cursor: pointer;
        }
        .used{
            text-align: center;
            color: #222;
            border-radius:0 4px 4px 0;
            cursor: pointer;
        }
        span{
            font-size: 12px;
        }
        .active{
            border: 1px solid #222;
            background-color: #222;
            color: #fff;
        }
    }

</style>