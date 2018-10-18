<template>
    <a :href="href" :title="title">
        <img :alt="title" :src="src">
    </a>
</template>

<script>
    export default{
        props: [
            'href',
            'title',
            'src'
        ]
    }
</script>
<style scoped>
    img{
        width: 80px;
        height: 108px;
    }
</style>