<template>
    <div class="processBar">
        <ul>
            <li>
                <div class="content">
                    <p class="number"></p>
                    <p class="text">E-mail-setting</p>
                </div>
            </li>
            <li>
                <div class="content">
                    <p class="number"></p>
                    <p class="text">Confirm E-mail</p>
                </div>
            </li>
            <li>
                <div class="last-content">
                    <p class="last-number"></p>
                    <p class="last-text">Login protection is done</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "process-bar.vue"
    }
</script>

<style scoped>
    .processBar{
        width: 85%;
        margin: 40px auto;
        height: 70px;
        font-size: 12px;
    }
    .processBar ::after{
        clear: both;
        display: block;
        content: '';
    }
    ul{
        position: relative;
    }
    ul li{
        width: 50%;
        height: 2px;
        float: left;
        position: relative;
        background-color: #e5004f;
    }
    ul li:last-child{
        width: 25%;
        position: absolute;
        right: 0;
        background-color: #e4e3e3;
    }
    .content{
        width: 80px;
        position: absolute;
        left: 0;
        top: -11px;
    }
    .number{
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background-color: #e5004f;
    }
    .text{
        margin-left: -20px;
        margin-top: 10px;
        color: #999999;
    }
    .last-content{
        width: 22px;
        position: absolute;
        right: 0;
        top: -11px;
    }
    .last-number{
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background-color: #e4e3e3;
    }
    .last-text{
        width: 90px;
        margin-left: -40px;
        margin-top: 10px;
        text-align: center;
        color: #999999;
    }

</style>