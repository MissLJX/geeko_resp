<template>
    <div class="picture-show">
        <img v-bind:src="imgSrc">
    </div>
</template>

<script type="es6">
    export default {
        name: "picture-show",
        props:["imgSrc"]
    }
</script>

<style scoped lang="scss">
    .picture-show{
        margin: 25px 0px; 
        width: 100%; 
        text-align: center;
        img{
            display: block;
            width: 135px;
            margin-right: 38px;
        }
    }
</style>