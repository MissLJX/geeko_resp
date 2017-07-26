<template>
    <div class="tip" v-html="message">
        <p>{{message}}</p>
    </div>
</template>

<style type="scss/text" lang="scss">
    .tip {
        padding: 5px 10px;
        background-color: #fdf5f9;
    }
</style>

<script type="text/ecmascript-6">
    export default{
        props:['message']
    }
</script>