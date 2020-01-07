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

<style scoped type="scss">
img{
    width: 100%;
    height: auto;
}
</style>