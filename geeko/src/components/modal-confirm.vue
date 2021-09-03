<template>
    <div class="st-confirm">
        <div class="bd">
            <p>{{cfg.message}}</p>
        </div>
        <div class="fd">
            <button class="btn" @click="cfg.yes">{{cfg.btnFont.yes}}</button>
            <button class="btn no" @click="cfg.no">{{cfg.btnFont.no}}</button>
        </div>
    </div>
</template>

<style>
    .st-confirm {
        position: fixed;
        width: 85%;
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
</style>

<script type="text/ecmascript-6">
    export default{
        props: [
            'cfg'
        ]
    }
</script>