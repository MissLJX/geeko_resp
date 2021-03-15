<template>
    <ol class="star-list">
        <li :class="{active: i <= score}" v-for="i in 5" :index="i" @click="clickHandle"></li>
    </ol>
</template>

<style scoped>
    .star-list > li {
        display: inline-block;
        margin-left: 4px;
        width: 16px;
        height: 14px;
        background: url(https://image.geeko.ltd/site/icon/icon-153.png) center/100% no-repeat;
        cursor: pointer;
    }

    .star-list > li:first-child {
        margin-left: 0;
    }

    .star-list > li.active {
        background-image: url(https://image.geeko.ltd/site/icon/icon-158.png);
    }
</style>

<script type="text/ecmascript-6">
    export default{
        props: {
            score: {
                type: Number,
                default: 5
            }
        },
        methods: {
            clickHandle(evt){
                evt.preventDefault()
                this.$emit('star' , {star: evt.target.getAttribute('index')})
            }
        }
    }
</script>